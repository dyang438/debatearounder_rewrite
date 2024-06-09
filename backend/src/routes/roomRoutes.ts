import express from "express";
import RoomCode from "../models/Schemas";
import { Player } from "../models/Schemas";

const router = express.Router();

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
      const existingCode = await RoomCode.findOne({ roomCode });

      if (!existingCode) {
        isUnique = true;
      }
    }

    // Save the new room code to the database
    const newRoomCode = new RoomCode({ roomCode });
    await newRoomCode.save();

    res.status(201).json({ roomCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all/:roomCode", async (req, res) => {
  const { roomCode } = req.params;

  try {
    const players = await Player.find({ roomCode: roomCode });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error: error.message });
  }
});

export default router;