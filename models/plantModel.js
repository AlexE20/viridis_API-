const db = require('../firebase/config');

const plantCollection = db.collection('plantSpecies');

const getPlantsByName = async (name) => {
  const snapshot = await plantCollection
    .where('common_name', '>=', name)
    .where('common_name', '<=', name + '\uf8ff')
    .get();

  const results = [];
  snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
  return results;
};

module.exports = {
  getPlantsByName,
};
