const {db, admin} = require("../firebase/config");

const FieldValue = admin.firestore.FieldValue;
const UserPlant = require("../models/userPlantModel");

const getAllUserPlantsByGarden = async (userId, gardenId) => {
  const userPlantsRef = db.collection("user_plants");
  const snapshot = await userPlantsRef
    .where("userId", "==", userId)
    .where("gardenId", "==", gardenId)
    .get();

  const userPlants = snapshot.docs.map((doc) => new UserPlant(doc.id, doc.data()));

  return userPlants;
};


const deletePlantById = async (userPlantId) => {
  const cleanId = userPlantId.trim();

  const userPlantRef = db.collection("user_plants").doc(cleanId);

  const doc = await userPlantRef.get();
  if (!doc.exists) {
    console.warn("Document not found:", cleanId);
    return false;
  }

  await userPlantRef.delete();
  console.log("Deleted:", cleanId);
  return true;
};

const addUserPlant = async (userId, plantId, gardenId) => {
  const plantRef = await db.collection("plantSpeciesCatalog").doc(plantId);
  const plantSnapshot = await plantRef.get();

  if (!plantSnapshot.exists) {
    return null;
  }

  const plantData = plantSnapshot.data();

  const newUserPlantData = {
    ...plantData,
    plant_id: plantId,
    userId,
    gardenId,
    addedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const newPlantRef = await db.collection("user_plants").add(newUserPlantData);

  return new UserPlant(newPlantRef.id, newUserPlantData);
};


module.exports = {
  getAllUserPlantsByGarden,
  deletePlantById,
  addUserPlant,
};

