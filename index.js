const doetenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const plantRoutes = require("./routes/plantRoutes");
const authRoutes = require("./routes/authRoutes");
const userPlantRoutes = require("./routes/userPlantRoutes");
const gardenRoutes = require("./routes/gardenRoutes");
const userRoutes = require("./routes/userRoutes")
const { checkWateringReminders } = require("./services/notificationService");



const app = express();



cron.schedule("0 8 * * *", async () => {
    console.log("Running watering reminder job...");
    try {
      await checkWateringReminders();
    } catch (err) {
      console.error("Error in watering reminder job:", err);
    }
  });

app.use(cors());
app.use(express.json());

app.use("/api/plants", plantRoutes);
app.use("/api/userPlants", userPlantRoutes);
app.use("/api/gardens", gardenRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌿 Server running on port ${PORT}`));
