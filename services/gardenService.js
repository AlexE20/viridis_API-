const { db, admin } = require("../firebase/config");
const Garden = require("../models/gardenModel");

const getAllGardens = async (userId) => {
  const gardensRef = db.collection("gardens").where("idUser", "==", userId);
  const gardensSnapshot = await gardensRef.get();

  const gardens = gardensSnapshot.docs.map((doc) => {
    return new Garden(doc.id, doc.data());
  });

  return gardens;
};

const addGarden = async (userId, data) => {
  const gardenRef = await db.collection("gardens").add({
    ...data,
    idUser: userId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const gardenSnapshot = await gardenRef.get();

  return new Garden(gardenSnapshot.id, gardenSnapshot.data());
};

const deleteGarden = async (userId, gardenId) => {
  const gardenRef = db.collection("gardens").doc(gardenId);

  await gardenRef.delete();
  return true;
};

const getGardenById = async (gardenId) => {
  const gardenRef = db.collection("gardens").doc(gardenId);
  const gardenSnapshot = await gardenRef.get();

  if (!gardenSnapshot.exists) {
    return null;
  }

  return new Garden(gardenSnapshot.id, gardenSnapshot.data());
};

module.exports = {
  getAllGardens,
  addGarden,
  getGardenById,
  deleteGarden,
};
