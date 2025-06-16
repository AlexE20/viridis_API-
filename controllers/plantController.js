const plantService = require("../services/plantService");

const getPlants = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const startAfter = req.query.startAfter || null;

  try {
    const plants = await plantService.getAllPlants(limit, startAfter);
    res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPlantByName = async (req, res) => {
  const { plantName } = req.body;
  try {
    const plantSearched = await plantService.getPlantByName(plantName);
    if (plantSearched.length === 0) {
      return res.status(404).json({ message: "Plant was not found" });
    }
    return res.status(200).json(plantSearched);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPlants,
  getPlantByName,
};
