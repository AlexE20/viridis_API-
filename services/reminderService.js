const {db} = require("../firebase/config");
const { Timestamp } = require("firebase-admin/firestore");

const getAllPendingReminders = async (userId) => {
  const snapshot = await db
    .collection("reminders")
    .where("userId", "==", userId)
    .where("done", "==", false)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

const markReminderAsDone = async (reminderId) => {
  const ref = db.collection("reminders").doc(reminderId);
  const doc = await ref.get();
  if (!doc.exists) return null;

  const reminder = doc.data();
  const now = Timestamp.fromDate(new Date());


  await ref.update({ done: true });
  const plantRef = db.collection("user_plants").doc(reminder.plantId);
  const plantDoc = await plantRef.get();

  if (plantDoc.exists) {
    const plantData = plantDoc.data();
    const currentStreak = plantData.streak || 0;

    await plantRef.update({
      last_watered: now,
      streak: currentStreak + 1
    });
  }
};


const deleteReminder = async (reminderId) => {
  const ref = db.collection("reminders").doc(reminderId);
  const doc = await ref.get();
  if (!doc.exists) return null;

  await ref.delete();
  return true;
};

module.exports = {
  getAllPendingReminders,
  markReminderAsDone,
  deleteReminder,
};
