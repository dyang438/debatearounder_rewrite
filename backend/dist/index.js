"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const playerRoutes_1 = __importDefault(require("./routes/playerRoutes"));
// Read environment variables from .env file
dotenv_1.default.config();
const PORT = process.env.PORT ?? 8000;
const app = (0, express_1.default)();
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["k1", "k2"],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(body_parser_1.default.json());
const MONGO_URI = process.env.MONGO_URI ?? "";
console.log("Connecting to MongoDB:", MONGO_URI);
mongoose_1.default.connect(MONGO_URI).catch((error) => {
    console.error("MongoDB connection error:", error.message);
});
// Serve static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
// API routes
app.use("/api/room", roomRoutes_1.default);
app.use("/api/player", playerRoutes_1.default);
// Catch all other routes and return the React index file
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}.`);
});
