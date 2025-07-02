const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const reminderController = require("../controllers/reminderController");

router.use(verifyToken);

router.get("/", reminderController.getPendingReminders);
router.patch("/:reminderId/done", reminderController.markReminderDone);
router.delete("/:reminderId", reminderController.deleteReminder);

module.exports = router;
