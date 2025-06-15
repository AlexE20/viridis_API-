require("dotenv").config();
const express = require("express");
const cors = require("cors");
const plantRoutes = require('./routes/plantRoutes');
const authRoutes = require('./routes/authRoutes')
const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/plants', plantRoutes);
app.use('/api/auth', authRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌿 Server running on port ${PORT}`));
