const plantService = require("../services/plantService");

const getPlants = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const startAfter = req.query.startAfter || null;

  try {

    const plants = await plantService.getAllPlants(limit, startAfter);
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });

    const plants = await plantService.getAllPlants();
    if (plants.length === 0) {
      return res.status(404).json({ message: "No plants found" });
    }
    res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ message: "Internal server error" });

  }
};

module.exports = {
  getPlants,
};