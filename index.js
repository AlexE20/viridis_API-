const doetenv=require("dotenv").config();
const express = require("express");
const cors = require("cors");
const plantRoutes = require('./routes/plantRoutes');
const userPlantRoutes=require('./routes/userPlantRoutes');
const gardenRoutes=require('./routes/gardenRoutes');
const app = express();
app.use(cors());
app.use(express.json());

//app.use("/api/auth", require("./routes/auth"));

app.use('/api/plants', plantRoutes);
app.use('/api/userPlants',userPlantRoutes);
app.use('/api/gardens',gardenRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌿 Server running on port ${PORT}`));