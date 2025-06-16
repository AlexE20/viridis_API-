const { db, admin } = require("../firebase/config");

const UserPlant = require("../models/userPlantModel");

const getAllUserPlantsByGarden = async (userId, gardenId) => {
  const userPlantsRef = db.collection("user_plants");
  const snapshot = await userPlantsRef
    .where("userId", "==", userId)
    .where("gardenId", "==", gardenId)
    .get();

  const userPlants = snapshot.docs.map(
    (doc) => new UserPlant(doc.id, doc.data())
  );

  return userPlants;
};

const deletePlantById = async (userPlantId) => {
  const userPlantRef = db.collection("user_plants").doc(userPlantId);

  await userPlantRef.delete();
  return true;
};

const addUserPlant = async (userId, plantId, gardenId) => {
  const plantRef =db.collection("plantSpeciesCatalog").doc(plantId);
  const plantSnapshot = await plantRef.get();

  const plantData = plantSnapshot.data();

  const newUserPlantData = {
    ...plantData,
    plant_id: plantId,
    user_id:userId,
    garden_id:gardenId,
    addedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const newPlantRef = await db.collection("user_plants").add(newUserPlantData);

  return new UserPlant(newPlantRef.id, newUserPlantData);
};

const getUserPlantByName = async (userPlantName) => {
  const userPlantRef = db
    .collection("user_plants")
    .where("common_name", "==", userPlantName);

  const userPlantSnapshot = await userPlantRef.get();

  const userPlantMatch = userPlantSnapshot.docs.map((doc) => {
    return new UserPlant(doc.id, doc.data());
  });
  return userPlantMatch;
};

module.exports = {
  getAllUserPlantsByGarden,
  deletePlantById,
  addUserPlant,
  getUserPlantByName,
};
