//game functions

//this needs to return the index or name of the card we want the bot to draft
export function basicAIpick(botCurrentPicks, botGamePack, setRatings) {
  let colorbias = colorBias(botCurrentPicks);

  // console.log("CB", colorbias);

  // console.log(colorbias["whiteColorBias"], "<--- should be 0");
  // console.log(setRatings);
  let scores = [];

  for (let card of botGamePack) {
    let score = parseFloat(setRatings[card.name]);
    score = isNaN(score) ? 0 : score;
    // console.log(score);

    for (let color of card.colors) {
      switch (color) {
        case "W":
          score += colorbias["whiteColorBias"];
          break;
        case "U":
          score += colorbias["blueColorBias"];
          break;
        case "B":
          score += colorbias["blackColorBias"];
          break;
        case "R":
          score += colorbias["redColorBias"];
          break;
        case "G":
          score += colorbias["greenColorBias"];
          break;
        default:
          score += colorbias["colorlessBias"];
          break;
      }
    }
    score = isNaN(score) ? 0 : score;
    scores.push(score);
  }
  //get index of
  // console.log("Scores are calculated as :.....", scores);
  const botPick = scores.indexOf(Math.max(...scores));
  // console.log(botPick);
  // console.log(botGamePack[botPick]);
  return botGamePack[botPick];
}

export function colorBias(botBoard) {
  let total = 0;
  let white = 0;
  let blue = 0;
  let black = 0;
  let green = 0;
  let red = 0;
  let colorless = 0;

  if (botBoard.length == 0) {
    return {
      whiteColorBias: 0,
      blackColorBias: 0,
      blueColorBias: 0,
      redColorBias: 0,
      greenColorBias: 0,
      colorlessBias: 0,
    };
  }

  for (let card of botBoard) {
    total += card.count;

    for (let c of card.colors) {
      switch (c) {
        case "W":
          white += 1;
          break;
        case "U":
          blue += 1;
          break;
        case "B":
          black += 1;
        case "R":
          red += 1;
        case "G":
          green += 1;
        default:
          colorless += 1;
      }
    }
  }
  console.log(white);
  return {
    whiteColorBias: 1 + total != 0 ? white / total : 0,
    blackColorBias: 1 + total != 0 ? black / total : 0,
    blueColorBias: 1 + total != 0 ? blue / total : 0,
    redColorBias: 1 + total != 0 ? red / total : 0,
    greenColorBias: 1 + total != 0 ? green / total : 0,
    colorlessBias: 1 + total != 0 ? colorless / total : 0,
  };
}

export function getColorValue(colorBias, colors) {
  if (colors.length == 0) {
    return colorBias["colorlessBias"];
  }

  let score = 0;

  for (let color of colors) {
    switch (color) {
      case "R":
        score += colorBias["redColorBias"];
        break;
      case "W":
        score += colorBias["whiteColorBias"];
        break;
      case "G":
        score += colorBias["greenColorBias"];
        break;
      case "U":
        score += colorBias["blueColorBias"];
        break;
      case "B":
        score += colorBias["blackColorBias"];
        break;
      default:
        break;
    }
  }
  return score;
}

export function removeCardFromBooster(pack, itemID) {
  console.log("item ID is ... ?", itemID);
  return pack.filter((id) => id !== itemID);
}

export function AIRemovePick(pack, item) {
  return pack.filter((card) => card.name != item.name);
  // return cpy.filter((id) => id !== itemID);
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
  mythics,
  aiPicks
) {
  let pack0 = removeCardFromBooster(draftPacks[0], itemID);
  let pack1 = AIRemovePick(draftPacks[1], aiPicks[0]);
  let pack2 = AIRemovePick(draftPacks[2], aiPicks[1]);
  let pack3 = AIRemovePick(draftPacks[3], aiPicks[2]);
  let pack4 = AIRemovePick(draftPacks[4], aiPicks[3]);
  let pack5 = AIRemovePick(draftPacks[5], aiPicks[4]);
  let pack6 = AIRemovePick(draftPacks[6], aiPicks[5]);
  let pack7 = AIRemovePick(draftPacks[7], aiPicks[6]);

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
  mythics,
  aiPicks
) {
  let pack0 = removeCardFromBooster(draftPacks[0], itemID);
  let pack1 = AIRemovePick(draftPacks[1], aiPicks[0]);
  let pack2 = AIRemovePick(draftPacks[2], aiPicks[1]);
  let pack3 = AIRemovePick(draftPacks[3], aiPicks[2]);
  let pack4 = AIRemovePick(draftPacks[4], aiPicks[3]);
  let pack5 = AIRemovePick(draftPacks[5], aiPicks[4]);
  let pack6 = AIRemovePick(draftPacks[6], aiPicks[5]);
  let pack7 = AIRemovePick(draftPacks[7], aiPicks[6]);

  if (pack0.length === 0 && round < 3) {
    return createEightBoosters(lands, commons, uncommons, rares, mythics);
  }

  return [pack7, pack0, pack1, pack2, pack3, pack4, pack5, pack6];
}
