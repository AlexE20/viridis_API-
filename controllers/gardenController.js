const gardenService = require("../services/gardenService");

const getAllGardens = async (req, res) => {
  const { userId } = req.params;
  try {
    const Gardens = await gardenService.getAllGardens(userId);
    if (Gardens.length == 0) {
      return res.status(404).json({ message: "No gardens yet" });
    }
    return res.status(200).json(Gardens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addGarden = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  try {
    const addedGarden = await gardenService.addGarden(userId, data);
    if (!addedGarden) {
      return res.status(400).json({ message: "Bad request" });
    }
    return res.status(200).json(addedGarden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteGarden = async (req, res) => {
  const { userId, gardenId } = req.params;
  try {
    const deletedGarden = await gardenService.deleteGarden(userId, gardenId);
    if (!deletedGarden) {
      return res.status(404).json({ message: "Garden not found" });
    }
    return res.status(200).json({ message: "Garden deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllGardens,
  addGarden,
  deleteGarden,
};
