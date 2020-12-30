const initialStateC = {
  gameBoosters: [[]],
  pickedCards: [],
  progressValue: 0,
  round: 1,
  cardSetFromAPI: null,
  allCards: null,
  commons: null,
  uncommons: null,
  rares: null,
  mythics: null,
};

//game functions

function removeCardFromBooster(pack, itemID) {
  return pack.filter((id) => id !== itemID);
}

function partitionSetIntoCommons(set) {
  let commons = [...set];
  return commons.filter((card) => card.rarity === "common");
}

function partitionSetIntoUncommons(set) {
  let uncommons = [...set];
  return uncommons.filter((card) => card.rarity === "uncommon");
}

function partitionSetIntoRares(set) {
  let rares = [...set];
  return rares.filter((card) => card.rarity === "rare");
}

function partitionSetIntoMythics(set) {
  let mythics = [...set];
  return mythics.filter((card) => card.rarity === "mythic");
}

//1 rare/mythic, 3 uncommons, 10 commons
function createBoosterFromSet(commons, uncommons, rares, mythics) {
  let booster = [];

  while (booster.length < 10) {
    const randomCard = commons[Math.floor(Math.random() * commons.length)];
    let isIn = false;
    for (let x of booster) {
      if (x.name === randomCard.name) {
        isIn = true;
      }
    }
    if (!isIn) {
      booster.push(randomCard);
    }
  }

  while (booster.length < 13) {
    const randomCard = uncommons[Math.floor(Math.random() * uncommons.length)];
    let isIn = false;
    for (let x of booster) {
      if (x.name === randomCard.name) {
        isIn = true;
      }
    }
    if (!isIn) {
      booster.push(randomCard);
    }
  }

  let rareOrMythic = Math.floor(Math.random() * Math.floor(9));
  if (rareOrMythic === 8) {
    booster.push(rares[Math.floor(Math.random() * rares.length)]);
  } else {
    booster.push(mythics[Math.floor(Math.random() * mythics.length)]);
  }
  return booster;
}

function pickCardFromBooster(pack, itemID) {
  return pack[pack.indexOf(itemID)];
}

function shouldIncrementRound(pack) {
  if (pack.length === 1) {
    return true;
  }
  return false;
}

function AIpickCardFromBooster(pack) {
  let copyPack = [...pack];
  let topIndex = pack.length;
  let x = Math.floor(Math.random() * Math.floor(topIndex));
  copyPack.splice(x, 1);
  return copyPack;
}

function createEightBoosters(commons, uncommons, rares, mythics) {
  let gameboosters = [];
  for (let i = 0; i < 8; i++) {
    gameboosters.push(createBoosterFromSet(commons, uncommons, rares, mythics));
  }
  return gameboosters;
}

function createEightFakeBoosters() {
  let fakeSet = [];
  for (let i = 0; i < 8; i++) {
    let fakeBooster = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    fakeSet.push(fakeBooster);
  }
  return fakeSet;
}

/* Takes in the draft packs for round 1 and 3, picks the player card, makes AI picks,
   and rotates packs LEFT */
function playerPickOdd(
  draftPacks,
  itemID,
  round,
  commons,
  uncommons,
  rares,
  mythics
) {
  let pack0 = removeCardFromBooster(draftPacks[0], itemID);
  let pack1 = AIpickCardFromBooster(draftPacks[1]);
  let pack2 = AIpickCardFromBooster(draftPacks[2]);
  let pack3 = AIpickCardFromBooster(draftPacks[3]);
  let pack4 = AIpickCardFromBooster(draftPacks[4]);
  let pack5 = AIpickCardFromBooster(draftPacks[5]);
  let pack6 = AIpickCardFromBooster(draftPacks[6]);
  let pack7 = AIpickCardFromBooster(draftPacks[7]);

  if (pack0.length === 0 && round < 3) {
    return createEightBoosters(commons, uncommons, rares, mythics);
  }

  return [pack1, pack2, pack3, pack4, pack5, pack6, pack7, pack0];
}

function playerPickEven(
  draftPacks,
  itemID,
  round,
  commons,
  uncommons,
  rares,
  mythics
) {
  let pack0 = removeCardFromBooster(draftPacks[0], itemID);
  let pack1 = AIpickCardFromBooster(draftPacks[1]);
  let pack2 = AIpickCardFromBooster(draftPacks[2]);
  let pack3 = AIpickCardFromBooster(draftPacks[3]);
  let pack4 = AIpickCardFromBooster(draftPacks[4]);
  let pack5 = AIpickCardFromBooster(draftPacks[5]);
  let pack6 = AIpickCardFromBooster(draftPacks[6]);
  let pack7 = AIpickCardFromBooster(draftPacks[7]);

  if (pack0.length === 0 && round < 3) {
    return createEightBoosters(commons, uncommons, rares, mythics);
  }

  return [pack7, pack0, pack1, pack2, pack3, pack4, pack5, pack6];
}

export default function appReducer(state = initialStateC, action) {
  switch (action.type) {
    case "gamecards/JSONLOADED": {
      console.log(action.payload);
      let _commons = partitionSetIntoCommons(action.payload);
      let _uncommons = partitionSetIntoUncommons(action.payload);
      let _rares = partitionSetIntoRares(action.payload);
      let _mythics = partitionSetIntoMythics(action.payload);
      return {
        ...state,
        commons: _commons,
        uncommons: _uncommons,
        rares: _rares,
        mythics: _mythics,
        gameBoosters: createEightBoosters(
          _commons,
          _uncommons,
          _rares,
          _mythics
        ),

        allCards: action.payload,
      };
    }
    case "gamecards/generateFakeSet": {
      return {
        ...state,
        // gameBoosters: createEightFakeBoosters(),
        progressValue: 0,
        round: 1,
      };
    }

    case "gamecards/pickDraftCard": {
      return {
        ...state,
        gameBoosters:
          state.round % 2 === 1
            ? playerPickOdd(
                state.gameBoosters,
                action.payload,
                state.round,
                state.commons,
                state.uncommons,
                state.rares,
                state.mythics
              )
            : playerPickEven(
                state.gameBoosters,
                action.payload,
                state.round,
                state.commons,
                state.uncommons,
                state.rares,
                state.mythics
              ),

        progressValue:
          state.progressValue + 2.22 > 99 ? 100 : state.progressValue + 2.22,
        round: shouldIncrementRound(state.gameBoosters[0])
          ? state.round + 1
          : state.round,
      };
    }

    default:
      return state;
  }
}
