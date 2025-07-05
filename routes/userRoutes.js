
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
router.post("/update-token", userController.updateToken)
router.get("/:userId/user", userController.getUsernameById)
module.exports = router;

