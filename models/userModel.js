class User {
  constructor(uid, data) {
    this.uid = uid;
    this.email = data.email || null;
    this.username = data.username;
    this.currentStreak = data.currentStreak || 0;
    this.gardensOwned = data.gardensOwned || 0;
    this.createdAt = new Date();
    this.badges = data.badges || [];
    this.fcmToken = data.fcmToken || null;
  }
  toJSON() {
    return {
      badges: this.badges,
      currentStreak: this.currentStreak,
    };
  }
}

module.exports = User;
