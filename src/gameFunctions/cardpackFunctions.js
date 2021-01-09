//game functions

export function removeCardFromBooster(pack, itemID) {
  return pack.filter((id) => id !== itemID);
}

export function partitionBasicLands(set) {
  let basiclands = [...set];

  const isLand = (card) => {
    return (
      card.name == "Plains" ||
      card.name == "Island" ||
      card.name == "Mountain" ||
      card.name == "Swamp" ||
      card.name == "Forest"
    );
  };

  return basiclands.filter((card) => isLand(card));
}

export function partitionSetIntoCommons(set) {
  let commons = [...set];
  const isLand = (card) => {
    return (
      card.name == "Plains" ||
      card.name == "Island" ||
      card.name == "Mountain" ||
      card.name == "Swamp" ||
      card.name == "Forest"
    );
  };
  return commons.filter((card) => card.rarity === "common" && !isLand(card));
}

export function partitionSetIntoUncommons(set) {
  let uncommons = [...set];
  return uncommons.filter((card) => card.rarity === "uncommon");
}

export function partitionSetIntoRares(set) {
  let rares = [...set];
  return rares.filter((card) => card.rarity === "rare");
}

export function partitionSetIntoMythics(set) {
  let mythics = [...set];
  return mythics.filter((card) => card.rarity === "mythic");
}

//1 rare/mythic, 3 uncommons, 10 commons
export function createBoosterFromSet(
  lands,
  commons,
  uncommons,
  rares,
  mythics
) {
  let booster = [];

  let rareOrMythic = Math.floor(Math.random() * Math.floor(9));
  if (rareOrMythic === 8) {
    booster.push(rares[Math.floor(Math.random() * rares.length)]);
  } else {
    booster.push(mythics[Math.floor(Math.random() * mythics.length)]);
  }

  while (booster.length < 4) {
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

  while (booster.length < 14) {
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

  booster.push(lands[Math.floor(Math.random() * lands.length)]);
  return booster;
}

export function pickCardFromBooster(pack, itemID) {
  return pack[pack.indexOf(itemID)];
}

export function shouldIncrementRound(pack) {
  if (pack.length === 1) {
    return true;
  }
  return false;
}

export function AIpickCardFromBooster(pack) {
  let copyPack = [...pack];
  let topIndex = pack.length;
  let x = Math.floor(Math.random() * Math.floor(topIndex));
  copyPack.splice(x, 1);
  return copyPack;
}

export function createEightBoosters(lands, commons, uncommons, rares, mythics) {
  let gameboosters = [];
  for (let i = 0; i < 8; i++) {
    gameboosters.push(
      createBoosterFromSet(lands, commons, uncommons, rares, mythics)
    );
  }
  return gameboosters;
}

/* Takes in the draft packs for round 1 and 3, picks the player card, makes AI picks,
   and rotates packs LEFT */
export function playerPickOdd(
  draftPacks,
  itemID,
  round,
  lands,
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
    return createEightBoosters(lands, commons, uncommons, rares, mythics);
  }

  return [pack1, pack2, pack3, pack4, pack5, pack6, pack7, pack0];
}

export function playerPickEven(
  draftPacks,
  itemID,
  round,
  lands,
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
    return createEightBoosters(lands, commons, uncommons, rares, mythics);
  }

  return [pack7, pack0, pack1, pack2, pack3, pack4, pack5, pack6];
}
