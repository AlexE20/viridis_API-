const plantService = require("../services/userPlantService");

const getAllUserPlants = async (req, res) => {
  const { userId, gardenId } = req.params;
  try {
    const userPlants = await plantService.getAllUserPlantsByGarden(
      userId,
      gardenId
    );
    if (userPlants.length === 0) {
      return res.status(404).json({ message: "No plants yet" });
    }
    return res.status(200).json(userPlants);
  } catch (error) {
    console.error("Error getting plants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePlantById = async (req, res) => {
  const { userId, gardenId, userPlantId } = req.params;
  try {
    const plantDeleted = await plantService.deletePlantById(
      userId,
      gardenId,
      userPlantId
    );
    if (!plantDeleted) {
      return res.status(404).json({ message: "Plant was not found" });
    }
    return res.status(200).json({ message: "Plant eliminated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addUserPlant = async (req, res) => {
  const { userId, plantId, gardenId } = req.params;
  try {
    const userPlant = await plantService.addUserPlant(
      userId,
      plantId,
      gardenId
    );
    if (!userPlant) {
      return res.status(400).json({ message: "Bad request" });
    }
    return res.status(200).json(userPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUserPlants,
  deletePlantById,
  addUserPlant,
};
