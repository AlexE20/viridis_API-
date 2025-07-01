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

    // Normalize watering to lowercase for consistent matching
    const wateringKey = (plant.watering || "").toLowerCase();
    const interval = wateringIntervals[wateringKey];

    console.log(`🔍 Checking "${plant.common_name}" for user ${plant.user_id}`);

    // Skip if watering or last_watered is missing
    if (!interval || !plant.last_watered) {
      console.log(`⏭️ Skipping "${plant.common_name}" (no watering info or last watered date)`);
      continue;
    }

    const lastWatered = plant.last_watered.toDate();
    const nextWateringDate = new Date(lastWatered);
    nextWateringDate.setDate(lastWatered.getDate() + interval);

    const lastSent = plant.lastReminderSent?.toDate?.();
    const recentlyReminded = lastSent && (now - lastSent < 1000 * 60 * 60 * 12); // 12 hours

    if (now >= nextWateringDate && !recentlyReminded) {
      const userRef = admin.firestore().collection("users").doc(plant.user_id);
      const userDoc = await userRef.get();
      const token = userDoc.data()?.fcmToken;

      if (!token) {
        console.warn(`⚠️ No FCM token for user ${plant.user_id}`);
        continue;
      }

      await admin.messaging().send({
        token,
        notification: {
          title: "🌿 Time to Water Your Plant!",
          body: `Don't forget to water "${plant.common_name}" today.`,
        },
      });

      console.log(`✅ Reminder sent to ${plant.user_id} for "${plant.common_name}"`);

      const missedDays = Math.floor((now - nextWateringDate) / (1000 * 60 * 60 * 24));

      await doc.ref.update({
        lastReminderSent: Timestamp.fromDate(now),
        wateringStreak: missedDays > 0 ? 0 : (plant.wateringStreak || 0) + 1,
      });
    } else {
      console.log(`⏳ Not due or recently reminded: "${plant.common_name}"`);
    }
  }
}

module.exports = { checkWateringReminders };
