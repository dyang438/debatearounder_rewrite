const invalidRoomCode = (roomCode: string) => {
  const code = Number(roomCode);
  return isNaN(code) || code < 100000 || code > 999999;
}

const invalidSkill = (skill: string) => {
  return skill !== "Beginner" && skill !== "Intermediate" && skill !== "Advanced";
}

const invalidPreference = (preference: string) => {
  return preference !== "Debate" && preference !== "Judge" && preference !== "Either";
}

export { invalidRoomCode, invalidSkill, invalidPreference };