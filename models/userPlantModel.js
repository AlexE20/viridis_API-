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
    this.last_watered =
      data.last_watered?.toDate().toLocaleDateString("es", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }) || null;
    this.wateringStreak =data.streak|| 0;
    this.missed_reminders = 0;
    this.next_reminder_date = this.calculateNextReminderDate();
  }

  calculateNextReminderDate() {
    const freqDays = {
      low: 7,
      medium: 3,
      high: 1
    };
    const days = freqDays[this.watering] || 3;

    const now = new Date();
    now.setDate(now.getDate() + days);
    return now.toISOString();
  }
}
module.exports = UserPlant;
