const plantService = require("../services/userPlantService");

const getAllUserPlants = async (req, res) => {
  const { userId, gardenId } = req.params;
  try {
    const userPlants = await plantService.getAllUserPlantsByGarden(
      userId,
      gardenId
    );
    if (userPlants.length === 0) {
      return res.status(200).json(userPlants);
    }
    return res.status(200).json(userPlants);
  } catch (error) {
    console.error("Error getting plants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePlantById = async (req, res) => {
  const { userPlantId } = req.params;
  try {
    const plantDeleted = await plantService.deletePlantById(userPlantId);
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
  const { userId, gardenId } = req.params;
  const { id } = req.body;
  console.log(req.body);

  if (!id) {
    return res.status(400).json({ message: "plantId is required in body" });
  }

  try {
    const userPlant = await plantService.addUserPlant(userId, id, gardenId);
    if (!userPlant) {
      return res
        .status(400)
        .json({ message: "Bad request: plant not found or cannot be added" });
    }
    return res.status(201).json(userPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserPlantByName = async (req, res) => {
  const { userPlantName } = req.body;
  try {
    const plantSearched = await plantService.getUserPlantByName(userPlantName);
    if (plantSearched.length === 0) {
      return res.status(404).json({ message: "Plant was not found" });
    }
    return res.status(200).json(plantSearched);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const waterUserPlant = async (req, res) => {
  const { userPlantId } = req.params;
  try {
    const userPlant = await plantService.waterUserPlant(userPlantId);
    if (!userPlant) {
      return res.status(404).json({ message: "Plant was not found" });
    }
    return res.status(200).json({
      message: "Plant watered successfully",
      userPlant: userPlant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUserPlants,
  deletePlantById,
  addUserPlant,
  getUserPlantByName,
  waterUserPlant,
};
