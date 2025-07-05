const { db, admin } = require("../firebase/config");
const User = require("../models/userModel");

const badgeMilestones = [
  { count: 10, name: "Agriculterer" },
  { count: 20, name: "Botanist" },
  { count: 30, name: "Grower" },
];

const getAllUsers = async () => {
  const usersRef = db.collection("users");

  const userSnapshot = await usersRef.get();

  const users = userSnapshot.docs.map((doc) => {
    return new User(doc.id, doc.data());
  });
  return users;
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

const updateStreak = async (userId) => {
  const userPlantsSnapshot = await db
    .collection("user_plants")
    .where("user_id", "==", userId)
    .get();

  if (userPlantsSnapshot.empty) {
    return false;
  }

  let streakValue = 0;

  userPlantsSnapshot.forEach((doc) => {
    const data = doc.data();
    if ((data.streak || 0) > 0) {
      streakValue++;
    }
  });
  

  const userRef = db.collection("users").doc(userId);
  await userRef.update({
    currentStreak: streakValue,
  });
  const updatedUserSnapshot = await userRef.get();

  return new User(updatedUserSnapshot.id, updatedUserSnapshot.data());
};

const updateBadges = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    return false;
  }
  const userData = userSnapshot.data();
  const currentStreak = userData.currentStreak || 0;
  const currentBadges = userData.badges || [];

  const newBadges = badgeMilestones
    .filter((b) => currentStreak >= b.count && !currentBadges.includes(b.name))
    .map((b) => b.name);

  if (newBadges.length > 0) {
    const updatedBadges = [...currentBadges, ...newBadges];
    await userRef.update({ badges: updatedBadges });
  }
  const updatedUserSnapshot = await userRef.get();

  return new User(updatedUserSnapshot.id, updatedUserSnapshot.data());
};

const updateToken = async(uid, fcmToken) => {

  await admin.firestore().collection("users").doc(uid).update({
    fcmToken: fcmToken,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return true
};


const fetchUsernameById = async (userId) => {
  const doc = await db.collection('users').doc(userId).get();

  if (!doc.exists) return null;

  const data = doc.data();
  return data.username ||  null;
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateStreak,
  updateBadges,
  updateToken,
  fetchUsernameById
};
