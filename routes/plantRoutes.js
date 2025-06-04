const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.get('/', (req, res) => {
  plantController.getPlants(req, res);
});

module.exports = router;
