class Plant {
  constructor(id, data) {
    this.id = id;
    this.common_name = data.common_name;
    this.scientific_name = data.scientific_name || [];
    this.care_level = data.care_level;
    this.watering = data.watering;
    this.default_image = data.default_image?.medium_url || null;
    this.recommendations = data.care_guide || []; 
  }
}

module.exports = Plant;