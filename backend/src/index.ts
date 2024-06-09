import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import path from "path";
import roomRouter from "./routes/roomRoutes";
import playerRouter from "./routes/playerRoutes";

// Read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["k1", "k2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI ?? "";
console.log("Connecting to MongoDB:", MONGO_URI);
mongoose.connect(MONGO_URI).catch((error) => {
  console.error("MongoDB connection error:", error.message);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// API routes
app.use("/api/room", roomRouter);
app.use("/api/player", playerRouter);

// Catch all other routes and return the React index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}.`);
});
