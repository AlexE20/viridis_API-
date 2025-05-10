const PlantModel = require('../models/plantModel');

const searchPlants = async (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const plants = await PlantModel.getPlantsByName(name);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
};

module.exports = {
  searchPlants,
};
