class User {

    constructor({ uid, data }) {
      this.uid = uid;
      this.email = data.email;
      this.username = data.username;
      this.createdAt = new Date();
      this.badge = null;
      this.fcmToken = data.fcmToken || null;
    }
  }
  
module.exports = User;
  

 

