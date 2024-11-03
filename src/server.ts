import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import authRoutes from "./routes/api/auth";
import userRoutes from "./routes/api/user";
import profileRoutes from "./routes/api/profile";
import faqRoutes from "./routes/api/faq";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/faq", faqRoutes);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
