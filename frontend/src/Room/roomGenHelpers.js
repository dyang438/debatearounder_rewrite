const processStrFields = (player) => {

  // Trim and lowercase string fields for better consistency on matching
  player.name = player.name.trim().toLowerCase();
  player.partner = player.partner.trim().toLowerCase();

  // Convert string fields to integers
  switch (player.skill) {
    case "Beginner":
      player.skill = 1;
      break;
    case "Intermediate":
      player.skill = 2;
      break;
    case "Advanced":
      player.skill = 3;
      break;
    default:
      console.error("Invalid skill level");
  }
  switch (player.preference) {
    case "Debate":
      player.preference = 1;
      break;
    case "Judge":
      player.preference = 2;
      break;
    case "Either":
      player.preference = 3;
      break;
    default:
      console.error("Invalid preference");
  }

}

const randomizeArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
}

const addBestJudge = (judgeArr, remainingArr) => {
  let bestJudgeIndex = 0;
  let bestJudgePriority = 0;
  for (let i = 0; i < remainingArr.length; i++) {
    let player = remainingArr[i];
    let judgePriority = player.preference;
    if (judgePriority > bestJudgePriority) {
      bestJudgeIndex = i;
      bestJudgePriority = judgePriority;
    }
  }
  judgeArr.push(remainingArr[bestJudgeIndex]);
  remainingArr.splice(bestJudgeIndex, 1)
}

const addRemainingJudges = (judgeArr, remainingArr, numberOfJudgesToAdd) => {
  while (numberOfJudgesToAdd > 0) {
    addBestJudge(judgeArr, remainingArr);
    numberOfJudgesToAdd--;
  }
}

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

const findPartnerships = (remainingArr, partnershipArr) => {
  for (let i = 0; i < remainingArr.length; i++) {
    const player = remainingArr[i];
    if (player.partner) {
      const partnerIndex = remainingArr.findIndex(p => p.name === player.partner && p.partner === player.name);
      if (partnerIndex !== -1 && partnerIndex !== i) {
        partnershipArr.push([player, remainingArr[partnerIndex]]);
        // Remove the partner first to avoid affecting the current loop iteration
        remainingArr.splice(partnerIndex, 1);
        // Remove the player after adjusting the index
        remainingArr.splice(i, 1);
        // Decrement the index to account for the removed element
        i--;
      }
    }
  }
}

const splicePartnerships = (remainingArr, partnershipArr) => {
  for (let i = 0; i < remainingArr.length; i += 2) {
    partnershipArr.push([remainingArr[i], remainingArr[i + 1]]);
  }
}

const totalPartnerSkill = (partnership) => {
  return partnership[0].skill + partnership[1].skill;
}

const orderPartnershipSkill = (partnershipArr) => {
  return partnershipArr.sort((a, b) => totalPartnerSkill(b) - totalPartnerSkill(a));
}

const flatten = (arr) => {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

export { processStrFields, randomizeArray, addRemainingJudges, deepClone, findPartnerships, splicePartnerships, orderPartnershipSkill, flatten};