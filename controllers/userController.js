const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await userService.createUser(data);
    if (!user) {
      return res.status(400).json({ message: "Bad request" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status.json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const toUpdateData = req.body;
  try {
    const updated = await userService.updateUser(userId, toUpdateData);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deleted = await userService.deleteUser(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", userId: userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateStreak = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await userService.updateStreak(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: "Bad request" });
    }
    return res
      .status(200)
      .json({ message: "Streak updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBadges = async (req, res) => {
  const { userId } = req.params;
  try {
    const userUpdated = await userService.updateBadges(userId);
    if (!userUpdated) {
      return res.status(404).json({ message: "Bad request" });
    }
    return res
      .status(200)
      .json({ message: "Badges updated successfully", user: userUpdated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateStreak,
  updateBadges,
};
