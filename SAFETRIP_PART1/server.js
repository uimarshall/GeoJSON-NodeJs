const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const cors = require("cors");
const routes = require("./routes/roads");
const connectDb = require("./config/db");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDb();
const app = express();

// Body Parser
app.use(express.json());

// Enable Cors
app.use(cors());

// Routes
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);