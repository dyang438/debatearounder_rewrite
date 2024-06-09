"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playerHelper_1 = require("../routeHelpers/playerHelper");
const validateAddPlayer = (req, res, next) => {
    const { roomCode, name, skill, partner, isStaying, preference } = req.body;
    if ((0, playerHelper_1.invalidRoomCode)(roomCode)) {
        return res.status(400).json({ message: "Invalid Room Code given to route /add" });
    }
    if (!name) {
        return res.status(403).json({ message: "No name given." });
    }
    if ((0, playerHelper_1.invalidSkill)(skill)) {
        return res.status(403).json({ message: "Invalid skill given." });
    }
    if (typeof isStaying !== 'boolean') {
        return res.status(403).json({ message: "No isStaying given." });
    }
    if ((0, playerHelper_1.invalidPreference)(preference)) {
        return res.status(403).json({ message: "Invalid Preference Given." });
    }
    next();
};
exports.default = validateAddPlayer;
