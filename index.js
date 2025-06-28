const doetenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const plantRoutes = require("./routes/plantRoutes");
const authRoutes = require("./routes/authRoutes");

const userPlantRoutes = require("./routes/userPlantRoutes");
const gardenRoutes = require("./routes/gardenRoutes");
const userRoutes = require("./routes/userRoutes")
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/plants", plantRoutes);
app.use("/api/userPlants", userPlantRoutes);
app.use("/api/gardens", gardenRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌿 Server running on port ${PORT}`));
