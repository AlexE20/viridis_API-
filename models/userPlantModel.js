const Plant = require("./plantModel");

class UserPlant {
    constructor(id, plantData) {
        this.id = id;
        this.common_name = plantData.common_name;
        this.scientific_name = plantData.scientific_name || [];
        this.care_level = plantData.care_level;
        this.watering = plantData.watering;

        this.watering_general_benchmark = {
            unit: plantData.watering_general_benchmark?.unit || null,
            value: plantData.watering_general_benchmark?.value || null
        };

        this.default_image = {
            license: plantData.default_image?.license,
            license_name: plantData.default_image?.license_name,
            license_url: plantData.default_image?.license_url,
            thumbnail: plantData.default_image?.thumbnail,
            small_url: plantData.default_image?.small_url,
            regular_url: plantData.default_image?.regular_url,
            medium_url: plantData.default_image?.medium_url,
            original_url: plantData.default_image?.original_url
        };

        this.other_images = plantData.other_images;
    }
}

module.exports=UserPlant;
