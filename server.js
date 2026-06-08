const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./rotues/auth_routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Authentication API running"
    });
});

const PORT = 3000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});

