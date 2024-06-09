"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPreference = exports.invalidSkill = exports.invalidRoomCode = void 0;
const invalidRoomCode = (roomCode) => {
    const code = Number(roomCode);
    return isNaN(code) || code < 100000 || code > 999999;
};
exports.invalidRoomCode = invalidRoomCode;
const invalidSkill = (skill) => {
    return skill !== "Beginner" && skill !== "Intermediate" && skill !== "Advanced";
};
exports.invalidSkill = invalidSkill;
const invalidPreference = (preference) => {
    return preference !== "Debate" && preference !== "Judge" && preference !== "Either";
};
exports.invalidPreference = invalidPreference;
