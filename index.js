require("dotenv").config();
const express = require("express");
const cors = require("cors");
const plantRoutes = require('./routes/plantRoutes');
const app = express();
app.use(cors());
app.use(express.json());

//app.use("/api/auth", require("./routes/auth"));

app.use('/api/plants', plantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌿 Server running on port ${PORT}`));
