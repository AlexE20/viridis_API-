class Reminder {
    constructor(id, data) {
      this.id = id;
      this.userId = data.userId;
      this.plantId = data.plantId;
      this.gardenId = data.gardenId;
      this.common_name = data.common_name;
      this.image = data.image;
      this.dueAt = data.dueAt;
      this.done = data.done;
      this.createdAt = data.createdAt;
    }
  }
  
  module.exports = Reminder;
  