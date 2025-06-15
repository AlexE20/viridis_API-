class User {
  constructor(uid, data) {
    this.uid = uid;
    this.name = data.name;
    this.lastname = data.lastname;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.badge = data.badge;
  }
}

module.exports = User;
