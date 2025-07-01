
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const {admin} = require("../firebase/config");


router.get('/', userController.getAllUsers); 
router.post('/create', userController.createUser); 
router.put('/:userId', userController.updateUser); 
router.delete('/:userId', userController.deleteUser); 
router.patch("/currentStreak/:userId", userController.updateStreak);
router.patch("/badges/:userId", userController.updateBadges);



router.post("/update-token", async (req, res) => {
  const { uid, fcmToken } = req.body;

  if (!uid || !fcmToken) {
    return res.status(400).json({ error: "uid and fcmToken are required" });
  }

  try {
    await admin.firestore().collection("users").doc(uid).update({
      fcmToken: fcmToken,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Token updated successfully" });
  } catch (error) {
    console.error("Error updating token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

