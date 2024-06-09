"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Schemas_1 = __importDefault(require("../models/Schemas"));
const Schemas_2 = require("../models/Schemas");
const router = express_1.default.Router();
/**
 * This function generates a 6 digit integer without a leading 0 for the purpose of creating a room code.
 */
const generateRoomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
router.post('/create', async (req, res) => {
    try {
        let roomCode = '';
        let isUnique = false;
        // Keep generating a new room code until a unique one is found
        while (!isUnique) {
            roomCode = generateRoomCode();
            const existingCode = await Schemas_1.default.findOne({ roomCode });
            if (!existingCode) {
                isUnique = true;
            }
        }
        // Save the new room code to the database
        const newRoomCode = new Schemas_1.default({ roomCode });
        await newRoomCode.save();
        res.status(201).json({ roomCode });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/all/:roomCode", async (req, res) => {
    const { roomCode } = req.params;
    try {
        const players = await Schemas_2.Player.find({ roomCode: roomCode });
        res.status(200).json(players);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching players", error: error.message });
    }
});
exports.default = router;
