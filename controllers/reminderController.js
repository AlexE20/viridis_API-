const reminderService = require("../services/reminderService");

const getPendingReminders = async (req, res) => {
  const userId = req.user.uid;

  try {
    const reminders = await reminderService.getAllPendingReminders(userId);
    res.status(200).json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
};

const markReminderDone = async (req, res) => {
  const { reminderId } = req.params;

  try {
    const success = await reminderService.markReminderAsDone(reminderId);
    if (!success) return res.status(404).json({ message: "Reminder not found" });

    res.status(200).json({ message: "Reminder marked as done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update reminder" });
  }
};

const deleteReminder = async (req, res) => {
  const { reminderId } = req.params;

  try {
    const success = await reminderService.deleteReminder(reminderId);
    if (!success) return res.status(404).json({ message: "Reminder not found" });

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete reminder" });
  }
};

module.exports = {
  getPendingReminders,
  markReminderDone,
  deleteReminder,
};
