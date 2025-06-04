const plantService = require('../services/plantService');

const getPlants = async (req, res) => {
  try {
    const plants = await plantService.getAllPlants();
    if (plants.length === 0) {
      return res.status(404).json({ message: 'No plants found' });
    }
    res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getPlants,
};
