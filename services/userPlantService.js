const { Timestamp } = require("firebase-admin/firestore");
const { db, admin } = require("../firebase/config");

const UserPlant = require("../models/userPlantModel");

const getAllUserPlantsByGarden = async (userId, gardenId) => {
  const userPlantsRef = db.collection("user_plants");
  const snapshot = await userPlantsRef
    .where("user_id", "==", userId)
    .where("garden_id", "==", gardenId)
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
  const plantRef = db.collection("plantCatalog").doc(plantId);
  const plantSnapshot = await plantRef.get();

  if (!plantSnapshot.exists) {
    return null;
  }

  const plantData = plantSnapshot.data();
  const timeStamp = admin.firestore.Timestamp.now();

  const newUserPlantData = {
    ...plantData,
    plant_id: plantId,
    user_id: userId,
    garden_id: gardenId,
    addedAt: timeStamp,
    last_watered: timeStamp,
    streak: 0,
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

const waterUserPlant = async (userPlantId) => {
  const userPlantRef = db.collection("user_plants").doc(userPlantId);
  const userPlantSnapshot = await userPlantRef.get();

  if (!userPlantSnapshot.exists) {
    return null;
  }

  const userPlantData = userPlantSnapshot.data();
  const currentTime = admin.firestore.Timestamp.now();

  // Update the last watered time and add a +1 in streaks so it can be used in the front end
  const updatedData = {
    last_watered: currentTime,
    streak: (userPlantData.streak || 0) + 1,
  };

  await userPlantRef.update(updatedData);

  return new UserPlant(userPlantId, { ...userPlantData, ...updatedData });
};

module.exports = {
  getAllUserPlantsByGarden,
  deletePlantById,
  addUserPlant,
  getUserPlantByName,
  waterUserPlant,
};
