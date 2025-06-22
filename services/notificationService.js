const {admin} = require("../firebase/config");
const { Timestamp } = require("firebase-admin/firestore");

const wateringIntervals = {
  low: 7,
  medium: 3,
  high: 1,
};

async function checkWateringReminders() {
  const snapshot = await admin.firestore().collection("user_plants").get();

  const now = new Date();

  for (const doc of snapshot.docs) {
    const plant = doc.data();
    const interval = wateringIntervals[plant.watering];
    if (!interval || !plant.lastWatered) continue;

    const lastWatered = plant.lastWatered.toDate();
    const nextWateringDate = new Date(lastWatered);
    nextWateringDate.setDate(lastWatered.getDate() + interval);

    const due = now >= nextWateringDate;

    if (due) {
      const userRef = admin.firestore().collection("users").doc(plant.user_id);
      const userDoc = await userRef.get();
      const token = userDoc.data()?.fcmToken;

      if (!token) {
        console.warn(`No FCM token for user ${plant.user_id}`);
        continue;
      }

      await admin.messaging().send({
        token,
        notification: {
          title: "🌿 Time to Water Your Plant!",
          body: `Don't forget to water "${plant.common_name}" today.`,
        },
      });

      console.log(`Sent reminder to ${plant.user_id} for plant ${plant.common_name}`);

      const missedDays = Math.floor((now - nextWateringDate) / (1000 * 60 * 60 * 24));
      const update = {
        lastReminderSent: Timestamp.fromDate(now),
      };

      if (missedDays > 0) {
        update.wateringStreak = 0;
      } else {
        update.wateringStreak = (plant.wateringStreak || 0) + 1;
      }

      await doc.ref.update(update);
    }
  }
}

module.exports = { checkWateringReminders };
