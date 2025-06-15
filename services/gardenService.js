const db = require("../firebase/config");
const Garden = require("../models/gardenModel");

const getAllGardens = async (userId) => {
  const GardenRef = db.collection("users").doc(userId).collection("gardens");

  const GardenSnapshot = await GardenRef.get();

  const Gardens = GardenSnapshot.docs.map((doc) => {
    return new Garden(doc.id, doc.data());
  });

  return Gardens;
};

const addGarden = async (userId, data) => {
  const gardenRef = db
    .collection("users")
    .doc(userId)
    .collection("gardens")
    .add({
      ...data,
      idUser: userId,
    });

  const GardenSnapshot = await gardenRef.get();

  return new Garden(GardenSnapshot.id, GardenSnapshot.data());
};

const deleteGarden = async (userId, gardenId) => {
  const gardenRef = db
    .collection("users")
    .doc(userId)
    .collection("gardens")
    .doc(gardenId);

  await gardenRef.delete();
  return true;
};

module.exports = {
  getAllGardens,
  addGarden,
  deleteGarden,
};
