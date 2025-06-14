const express=require('express');
const router=express.Router();
const userPlantController=require('../controllers/userPlantController');

router.get('/:userId/:gardenId',userPlantController.getAllUserPlants);
router.delete('/:userId/:gardenId/:userPlantId',userPlantController.deletePlantById);
router.post('/:userId/:gardenId/:plantId',userPlantController.addUserPlant);

module.exports=router;