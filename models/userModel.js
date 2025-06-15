class User {

    constructor({ uid, data }) {
      this.uid = uid;
      this.email = data.email;
      this.username = data.username;
      this.createdAt = new Date();
      this.badge = data.badge;
    }
  }
  
module.exports = User;
  

 

