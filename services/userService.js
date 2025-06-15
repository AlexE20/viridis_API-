const db = require("../firebase/config");
const User = require("../models/userModel");

const getAllUsers = async () => {
  const usersRef = db.collection("users");

  const userSnapshot = await usersRef.get();

  const users = userSnapshot.docs.map((doc) => {
    return new User(doc.id, doc.data());
  });
};

const createUser = async (data) => {
  const userRef = await db.collection("users").add(data);

  const userSnapshot = await userRef.get();

  return new User(userSnapshot.id, userSnapshot.data());
};

const updateUser = async (userId, toUpdateData) => {
  await db.collection("users").doc(userId).update(toUpdateData);
  return true;
};

const deleteUser = async (userId) => {
  await db.collection("users").doc(userId).delete();
  return true;
};

module,
  (exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  });
