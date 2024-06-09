import {addRemainingJudges, deepClone, findPartnerships,
  processStrFields, randomizeArray ,splicePartnerships, orderPartnershipSkill, flatten
} from "./roomGenHelpers.js";

const generateRoom = (roomCode, players_original) => {

  //players is a deep clone of players_original
  //players is a list of player objects.
  //player object has name, skill, partner, isStaying, preference
  let players = deepClone(players_original);

  console.log(players);

  let judgeArr = [];
  let remainingArr = [];
  let partnershipArr = [];
  let retJson = {};


  players.forEach(player => {
    delete player.roomCode;
    processStrFields(player);
    //functionally isStaying is equivalent to isJudge
    player.isStaying ? remainingArr.push(player) : judgeArr.push(player);
  })

  const openCount = remainingArr.length;
  // const playerNames = remainingArr.map(player => player.name);
  // const playerPartners = remainingArr.map(player => player.partner);

  const remainder = openCount % 8;
  let numberOfJudgesToAdd = remainder % 4;

  retJson.eight_person_rooms = Math.floor(openCount / 8);
  retJson.four_person_rooms = Math.floor(remainder / 4);

  // Currently deal with partnerships. Want to add [player1, player2] to partnershipArr.
  // This will be used to generate the rooms.

  // If we randomize here, it helps randomize case of 2 possible partners.
  remainingArr = randomizeArray(remainingArr);

  // Find partnerships
  findPartnerships(remainingArr, partnershipArr);

  // Randomize the order of the players remaining before adding final judges
  remainingArr = randomizeArray(remainingArr);
  addRemainingJudges(judgeArr, remainingArr, numberOfJudgesToAdd);

  // At this point the judges are all set, we just have to add the remaining partnerships in.
  // Sort the remainingArr by skill level to ensure that close skill partnerships are formed.
  remainingArr = randomizeArray(remainingArr);
  remainingArr.sort((a, b) => a.skill - b.skill);
  if (remainingArr.length % 2 !== 0) {
    console.log(remainingArr.length);
    console.error("Invalid number of remaining players");
  }
  splicePartnerships(remainingArr, partnershipArr);
  orderPartnershipSkill(partnershipArr);

  retJson.roomMain = flatten(partnershipArr).concat(judgeArr);
  console.log(retJson);
  return retJson;
}

export default generateRoom;