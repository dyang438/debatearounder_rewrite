
interface IPlayer extends Document {
  _id: string;
  roomCode: string;
  name: string;
  skill: string;
  partner: string;
  isStaying: string;
  preference: string;
}

export default IPlayer;