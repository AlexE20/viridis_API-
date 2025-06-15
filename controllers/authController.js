const authService = require('../services/authService');

const register = async (req, res) => {
  const {uid,email, username}  = req.body;
  const data = {email, username}
  if (!uid || !email || !username) {
    return res.status(400).json({ error: 'UID, email, and username are required' });
  }

  try {
    const user = await authService.register(uid, data);

    res.status(201).json({
      message: 'User saved in Firestore successfully',
      uid: user.uid,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
};
