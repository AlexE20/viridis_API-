class UserPlant {
  constructor(id, data) {
    this.id = id;
    this.plant_id = data.plant_id;
    this.user_id = data.user_id;
    this.garden_id = data.garden_id;
    this.common_name = data.common_name;
    this.scientific_name = data.scientific_name || [];
    this.care_level = data.care_level;
    this.shade_level = data.shade_level;
    this.watering = data.watering;
    this.default_image = data.default_image?.medium_url || null;
    this.recommendations = data.care_guide || [];
    this.last_watered = this.parseLastWatered(data.last_watered);
    this.wateringStreak = data.streak || 0;
    this.missed_reminders = 0;
    this.next_reminder_date = this.calculateNextReminderDate();
  }

  parseLastWatered(timestamp) {
    try {
      if (
        timestamp &&
        typeof timestamp.toDate === "function"
      ) {
        const date = timestamp.toDate();
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("es", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          });
        }
      }
    } catch (err) {
      console.warn("⚠️ Error parsing last_watered:", err.message);
    }
    return null;
  }

  calculateNextReminderDate() {
    const freqDays = {
      Low: 7,
      Average: 3,
      Frequent: 1, 
    };

    const days = freqDays[this.watering] || 3;

    const now = new Date();
    now.setDate(now.getDate() + days);
    return now.toISOString();
  }
}

module.exports = UserPlant;
