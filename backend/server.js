// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const diagnosticRoutes = require("./routes/diagnostic");
app.use("/api", diagnosticRoutes);

const recommendationsRoutes = require("./routes/recommendations");
app.use("/api", recommendationsRoutes);

const remindersRoutes = require("./routes/reminders");
app.use("/api", remindersRoutes);

require("./cronJobs");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));