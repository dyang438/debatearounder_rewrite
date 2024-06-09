import { invalidRoomCode, invalidSkill, invalidPreference } from "../routeHelpers/playerHelper";

const validateAddPlayer = (req, res, next) => {
  const { roomCode, name, skill, partner, isStaying, preference } = req.body;

  if (invalidRoomCode(roomCode)) {
    return res.status(400).json({ message: "Invalid Room Code given to route /add" });
  }
  if (!name) {
    return res.status(403).json({ message: "No name given." });
  }
  if (invalidSkill(skill)) {
    return res.status(403).json({ message: "Invalid skill given." });
  }
  if (typeof isStaying !== 'boolean') {
    return res.status(403).json({ message: "No isStaying given." });
  }
  if (invalidPreference(preference)) {
    return res.status(403).json({ message: "Invalid Preference Given." });
  }

  next();
};

export default validateAddPlayer;
