"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddPlayer = exports.getAllPlayers = void 0;
const Schemas_1 = require("./models/Schemas");
const getAllPlayers = async (socket, roomCode) => {
    try {
        const players = await Schemas_1.Player.find({ roomCode }).lean();
        socket.emit("all-players", { players });
    }
    catch (error) {
        socket.emit("error", "Failed to fetch players");
    }
};
exports.getAllPlayers = getAllPlayers;
const handleAddPlayer = async (io, socket, roomCode, playerId) => {
    try {
        const player = await Schemas_1.Player.findById(playerId).lean();
        if (player) {
            io.to(roomCode).emit("new-player", { player });
        }
        else {
            socket.emit("error", { message: "Player not found" });
        }
    }
    catch (error) {
        socket.emit("error", { message: "Player not found" });
    }
};
exports.handleAddPlayer = handleAddPlayer;
