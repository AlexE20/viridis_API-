const plantService = require('../services/plantService');

const getPlants = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const startAfter = req.query.startAfter || null;

  try {
    const plants = await plantService.getAllPlants(limit, startAfter);
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPlants,
};