const express=require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers); 
router.post('/create', userController.createUser); 
router.put('/:userId', userController.updateUser); 
router.delete('/:userId', userController.deleteUser); 

module.exports = router;    