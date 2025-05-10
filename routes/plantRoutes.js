const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.get('/search', plantController.searchPlants);

module.exports = router;
