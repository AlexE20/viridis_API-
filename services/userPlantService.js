const db = require('../firebase/config');
const UserPlant = require('../models/UserPlant');

const getAllUserPlantsByGarden = async (userId, gardenId) => {
    const UserPlantRef = db
        .collection("users").doc(userId)
        .collection("gardens").doc(gardenId)
        .collection("user_plants");

    const snapshot = await UserPlantRef.get();


    const userPlants = snapshot.docs.map((doc) => {
        return new UserPlant(doc.id, doc.data());
    });

    return userPlants;
};

const deletePlantById = async (UserPlantId) => {
    const UserPlantRef =
        db
            .collection("user_plants").doc(UserPlantId);


    await UserPlantRef.delete();
    return true;
};

const addUserPlant = async (userId, plantId, gardenId) => {
    const plantRef = db.collection("plants").doc(plantId);
    const plantSnapshot = await plantRef.get();


    const plantData = plantSnapshot.data();

    const newPlantRef = await db
        .collection("user").doc(userId)
        .collection("gardens").doc(gardenId)
        .collection("user_plants").add(plantData);

    return new UserPlant(newPlantRef.id, plantData);


}




module.exports = {
    getAllUserPlantsByGarden,
    deletePlantById,
    addUserPlant
};