const express=require('express');
const router=express.Router();
const gardenController=require('../controllers/gardenController');

router.get('/:userId',gardenController.getAllGardens);
router.post('/:userId',gardenController.addGarden);
router.delete('/:userId/:gardenId',gardenController.deleteGarden);

module.exports=router;