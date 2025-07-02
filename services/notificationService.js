const { admin } = require("../firebase/config");
const { Timestamp } = require("firebase-admin/firestore");


const wateringIntervals = {
  low: 7,
  average: 3,
  frequent: 1,
};



async function checkWateringReminders() {
  const snapshot = await admin.firestore().collection("user_plants").get();
  const now = new Date();

  for (const doc of snapshot.docs) {
    const plant = doc.data();
    const wateringKey = (plant.watering || "").toLowerCase();
    const interval = wateringIntervals[wateringKey];

    console.log(`🔍 Checking "${plant.common_name}" for user ${plant.user_id}`);

    if (!interval || !plant.last_watered) {
      console.log(`⏭️ Skipping "${plant.common_name}" (no watering info or last watered date)`);
      continue;
    }

    const lastWatered = plant.last_watered.toDate();
    const nextWateringDate = new Date(lastWatered);
    nextWateringDate.setDate(lastWatered.getDate() + interval);

    const lastSent = plant.lastReminderSent?.toDate?.();
    const recentlyReminded = lastSent && (now - lastSent < 1000 * 60 * 60 * 12); // 12h

    if (now >= nextWateringDate && !recentlyReminded) {
      const userRef = admin.firestore().collection("users").doc(plant.user_id);
      const userDoc = await userRef.get();
      const token = userDoc.data()?.fcmToken;

      if (!token) {
        console.warn(`⚠️ No FCM token for user ${plant.user_id}`);
        continue;
      }

      //  Send notification
      await admin.messaging().send({
        token,
        notification: {
          title: "🌿 Time to Water Your Plant!",
          body: `Don't forget to water "${plant.common_name}" today.`,
        },
      });

      console.log(`✅ Reminder sent to ${plant.user_id} for "${plant.common_name}"`);

      //  Create reminder document
      await admin.firestore().collection("reminders").add({
        userId: plant.user_id,
        plantId: doc.id,
        gardenId: plant.garden_id || null,
        common_name: plant.common_name || "",
        image: plant.default_image || null,
        dueAt: Timestamp.fromDate(nextWateringDate),
        done: false,
        createdAt: Timestamp.fromDate(now),
      });

      // Update plant
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


