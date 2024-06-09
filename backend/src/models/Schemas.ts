import mongoose, { Document, Schema } from 'mongoose';

// Define the IPlayer interface extending Document
interface IPlayer extends Document {
  roomCode: string;
  name: string;
  skill: string;
  partner: string;
  isStaying: boolean; // Changed to boolean
  preference: string;
}

// Define the PlayerSchema
const PlayerSchema: Schema = new Schema({
  roomCode: { type: String, required: true },
  name: { type: String, required: true },
  skill: { type: String, required: true },
  partner: { type: String, required: false },
  isStaying: { type: Boolean, required: true }, // Changed to Boolean
  preference: { type: String, required: true },
});

// Define the IRoomCode interface extending Document
interface IRoomCode extends Document {
  roomCode: string;
}

// Define the RoomCodeSchema
const RoomCodeSchema: Schema = new Schema({
  roomCode: { type: String, required: true },
});

// Create models from the schemas
const RoomCode = mongoose.model<IRoomCode>('RoomCode', RoomCodeSchema);
const Player = mongoose.model<IPlayer>('Player', PlayerSchema);

export default RoomCode;
export { Player };
