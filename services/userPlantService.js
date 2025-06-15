const db = require("../firebase/config");
const UserPlant = require("../models/userPlantModel");

const getAllUserPlantsByGarden = async (userId, gardenId) => {

  const userPlantsRef = db.collection("user_plants");
  const snapshot = await userPlantsRef
    .where("userId", "==", userId)
    .where("gardenId", "==", gardenId)
    .get();

  const userPlants = snapshot.docs.map((doc) => {
    return new UserPlant(doc.id, doc.data());
  });

  return userPlants;
};

const deletePlantById = async (userPlantId) => {

  const userPlantRef = db.collection("user_plants").doc(userPlantId);
  await userPlantRef.delete();
  return true;
};

const addUserPlant = async (userId, plantId, gardenId) => {
  const plantRef = db.collection("plants").doc(plantId);
  const plantSnapshot = await plantRef.get();

  if (!plantSnapshot.exists) {
    return null;
  }

  const plantData = plantSnapshot.data();

  // Add userId and gardenId as fields (foreign keys)
  const newUserPlantData = {
    ...plantData,
    userId,
    gardenId,
    addedAt: db.FieldValue.serverTimestamp(), // optional: timestamp when added
  };

  const newPlantRef = await db.collection("user_plants").add(newUserPlantData);

  return new UserPlant(newPlantRef.id, newUserPlantData);
};

module.exports = {
  getAllUserPlantsByGarden,
  deletePlantById,
  addUserPlant,
};
