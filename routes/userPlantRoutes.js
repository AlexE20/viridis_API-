const express = require("express");
const router = express.Router();
const userPlantController = require("../controllers/userPlantController");

router.get("/:userId/:gardenId", userPlantController.getAllUserPlants);
router.delete("/:userPlantId", userPlantController.deletePlantById);
router.post("/:userId/:gardenId", userPlantController.addUserPlant);
router.get("/search",userPlantController.getUserPlantByName)

module.exports = router;
