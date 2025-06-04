class Plant {
  constructor(id, data) {
    this.id = id;
    this.common_name = data.common_name;
    this.scientific_name = data.scientific_name || [];
    this.care_level = data.care_level;
    this.watering = data.watering;
    this.watering_general_benchmark = {
      unit: data.watering_general_benchmark?.unit || null,
      value: data.watering_general_benchmark?.value || null
    };
    this.default_image = {
      license: data.default_image?.license,
      license_name: data.default_image?.license_name,
      license_url: data.default_image?.license_url,
      thumbnail: data.default_image?.thumbnail,
      small_url: data.default_image?.small_url,
      regular_url: data.default_image?.regular_url,
      medium_url: data.default_image?.medium_url,
      original_url: data.default_image?.original_url
    };
    this.other_images = data.other_images;
  }
}

module.exports = Plant;
