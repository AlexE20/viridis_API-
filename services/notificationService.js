const { admin } = require("../firebase/config");
const { Timestamp } = require("firebase-admin/firestore");


const wateringIntervals = {
  Low: 7,
  Average: 3,
  Frequent: 1,
};

async function checkWateringReminders() {
  const snapshot = await admin.firestore().collection("user_plants").get();
  const now = new Date();

  for (const doc of snapshot.docs) {
    const plant = doc.data();
    const wateringKey = (plant.watering || "").toLowerCase();
    const interval = wateringIntervals[wateringKey];

    if (!interval || !plant.last_watered) {
      console.log(`⚠️ Skipping ${plant.common_name || doc.id} due to missing watering info`);
      continue;
    }

    const lastWatered = plant.last_watered.toDate();
    const nextWateringDate = new Date(lastWatered);
    nextWateringDate.setDate(lastWatered.getDate() + interval);

    const lastSent = plant.lastReminderSent?.toDate?.();
    const alreadyRemindedRecently = lastSent && (now - lastSent < 1000 * 60 * 60 * 12); // 12 hours

    console.log(`🔍 Checking "${plant.common_name}" for user ${plant.user_id}`);
    console.log(`🪴 Last watered: ${lastWatered.toISOString()}, Next: ${nextWateringDate.toISOString()}`);

    if (now >= nextWateringDate && !alreadyRemindedRecently) {
      const userRef = admin.firestore().collection("users").doc(plant.user_id);
      const userDoc = await userRef.get();
      const token = userDoc.data()?.fcmToken;

      if (!token) {
        console.warn(`🚫 No FCM token for user ${plant.user_id}`);
        continue;
      }

      await admin.messaging().send({
        token,
        notification: {
          title: "🌿 Time to Water Your Plant!",
          body: `Don't forget to water "${plant.common_name}" today.`,
        },
      });

      console.log(`✅ Sent reminder to ${plant.user_id} for plant "${plant.common_name}"`);

      const missedDays = Math.floor((now - nextWateringDate) / (1000 * 60 * 60 * 24));
      const update = {
        lastReminderSent: Timestamp.fromDate(now),
        wateringStreak: missedDays > 0 ? 0 : (plant.wateringStreak || 0) + 1,
        missed_reminders: missedDays > 0 ? (plant.missed_reminders || 0) + 1 : plant.missed_reminders || 0,
      };

      await doc.ref.update(update);
    } else {
      console.log(`⏳ Not due yet or recently reminded for "${plant.common_name}"`);
    }
  }
}

module.exports = { checkWateringReminders };
