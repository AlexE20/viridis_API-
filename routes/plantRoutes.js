const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");

router.get("/", plantController.getPlants);

router.get("/search", plantController.getPlantByName);

module.exports = router;
