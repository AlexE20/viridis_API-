const db = require('../firebase/config');
const UserPlant = require('../models/UserPlant');

const getAllUserPlantsByGarden = async (userId, gardenId) => {
    const UserPlantRef = db.
        collection("users").doc(userId)
        .collection("gardens").doc(gardenId)
        .collection("user_plants");

    const snapshot = await UserPlantRef.get();

    if (snapshot.empty) return [];

    const userPlants = snapshot.docs.map((doc) => {
        return new UserPlant(doc.id, doc.data());
    });

    return userPlants;
};


module.exports = {
    getAllUserPlantsByGarden,
};