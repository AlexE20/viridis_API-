const db = require("../firebase/config");
const Plant = require("../models/plantModel");

const getAllPlants = async () => {
  const snapshot = await db.collection("plantSpeciesCatalog").get();

  if (snapshot.empty) return [];

  const plants = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    plants.push(new Plant(doc.id, data));
  });

  return plants;
};

module.exports = {
  getAllPlants,
};
