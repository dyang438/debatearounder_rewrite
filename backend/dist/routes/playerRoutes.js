"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Schemas_1 = require("../models/Schemas");
const validateAddPlayer_1 = __importDefault(require("../middlewares/validateAddPlayer"));
const router = express_1.default.Router();
router.post("/add", validateAddPlayer_1.default, async (req, res) => {
    const { roomCode, name, skill, partner, isStaying, preference } = req.body;
    try {
        // Check if a player with the same room code and name already exists
        const existingPlayer = await Schemas_1.Player.findOne({ roomCode, name });
        if (existingPlayer) {
            // Update the existing player's details
            existingPlayer.skill = skill;
            existingPlayer.partner = partner;
            existingPlayer.isStaying = isStaying;
            existingPlayer.preference = preference;
            await existingPlayer.save();
            res.status(200).json({ message: 'Player updated successfully', playerId: existingPlayer._id });
        }
        else {
            const addedPlayer = new Schemas_1.Player({ roomCode, name, skill, partner, isStaying, preference });
            await addedPlayer.save();
            res.status(201).json({ message: 'Player added successfully', playerId: addedPlayer._id });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error handling adding question" });
    }
});
/**
 * Usage: This route is used to delete a player from the database, which is useful for the room admin.
 */
router.delete("/delete", async (req, res) => {
    const { roomCode, name } = req.body;
    try {
        // Find and delete the player with the specified room code and name
        const deletedPlayer = await Schemas_1.Player.findOneAndDelete({ roomCode, name });
        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json({ message: "Player deleted successfully", playerId: deletedPlayer._id.toString(), name: deletedPlayer.name });
    }
    catch (error) {
        res.status(500).json({ message: "Error handling delete player", error: error.message });
    }
});
exports.default = router;
