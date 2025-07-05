const { admin } = require('../firebase/config');

const firestore = admin.firestore();

async function register(uid, data) {
  const {email,username} = data
  try {
    await firestore.collection('users').doc(uid).set({
      email,
      username,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      uid,
      email,
      username,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  register
};


