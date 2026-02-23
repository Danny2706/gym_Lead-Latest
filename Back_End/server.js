const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const authRoute = require("./routes/authRoute")

// dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", contactRoutes, authRoute);


app.get("/", (req, res) => {
  res.send("FitLife API Running with PostgreSQL...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

