const { db } = require('../firebase/config');
const Plant = require('../models/plantModel');

const getAllPlants = async (limit = 10, startAfterId = null) => {
  let query = db.collection('plantSpeciesCatalog').orderBy('__name__').limit(limit);

  if (startAfterId) {
    const startAfterDoc = await db.collection('plantSpeciesCatalog').doc(startAfterId).get();
    if (!startAfterDoc.exists) {
      throw new Error(`Document with ID ${startAfterId} not found`);
    }
    query = query.startAfter(startAfterDoc);
  }

  const snapshot = await query.get();


  if (snapshot.empty) return [];

  const plants = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    plants.push(new Plant(doc.id, data));
  });

  return plants;
};


module.exports = { getAllPlants };
