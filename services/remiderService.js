const db = require("../firebase/config");

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

  await ref.update({ done: true });
  return true;
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
