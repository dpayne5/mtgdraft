const initialStateC = {
  gameBoosters: [[]],
  pickedCards: [],
  progressValue: 0,
  round: 1,
  cardSetFromAPI: null,
  allCards: null,
  commons: null,
  uncommons: null,
  rareANDmythics: null,
};

function removeCardFromBooster(pack, itemID) {
  return pack.filter((id) => id != itemID);
}

//read in JSON, and filter essential information for each card
async function getJSON(path) {
  let cardInfo = [];
  let data = await fetch(path)
    .then(function (response) {
      return response.json();
    })
    .then(function (d) {
      return d.data;
    });

  for (let x of data) {
    cardInfo.push({
      id: x.mtgo_id,
      name: x.name,
      imagelink:
        typeof x.image_uris != "undefined" ? x.image_uris["png"] : null,
      mana_cost: x.mana_cost,
      cmc: x.cmc,
      card_faces: x.card_faces,
      type: x.type_line,
      oracle_text: x.oracle_text,
      power: x.power,
      toughness: x.toughness,
      rarity: x.rarity,
    });
  }

  //quick workaround for dual sided cards, just use their frontside from the nested card_faces object
  for (let y of cardInfo) {
    if (typeof y.imagelink == null) {
      y.name = y.card_faces[0]["name"];
      y.mana_cost = y.card_faces[0]["mana_cost"];
      y.type = y.card_faces[0]["type"];
      y.oracle_text = y.card_faces[0]["oracle_text"];
      y.power = y.card_faces[0]["power"];
      y.toughness = y.card_faces[0]["toughness"];
      y.imagelink = y.card_faces[0]["image_uris"]["png"];
    }
  }

  console.log(cardInfo);

  return cardInfo;
}

function partitionSetIntoCommons(set) {
  let commons = [...set];
  return commons.filter((card) => card.rarity == "common");
}

function partitionSetIntoUncommons(set) {
  let uncommons = [...set];
  return uncommons.filter((card) => card.rarity == "uncommon");
}

function partitionSetIntoRareMythic(set) {
  let raremythic = [...set];
  return raremythic.filter(
    (card) => card.type == "rare" || card.type == "mythic"
  );
}

//1 rare/mythic, 3 uncommons, 10 commons
function createBoosterFromSet(set) {}

function pickCardFromBooster(pack, itemID) {
  return pack[pack.indexOf(itemID)];
}

function shouldIncrementRound(pack) {
  if (pack.length == 1) {
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
function playerPickOdd(draftPacks, itemID, round) {
  let pack0 = removeCardFromBooster(draftPacks[0], itemID);
  let pack1 = AIpickCardFromBooster(draftPacks[1]);
  let pack2 = AIpickCardFromBooster(draftPacks[2]);
  let pack3 = AIpickCardFromBooster(draftPacks[3]);
  let pack4 = AIpickCardFromBooster(draftPacks[4]);
  let pack5 = AIpickCardFromBooster(draftPacks[5]);
  let pack6 = AIpickCardFromBooster(draftPacks[6]);
  let pack7 = AIpickCardFromBooster(draftPacks[7]);

  if (pack0.length == 0 && round < 3) {
    return createEightFakeBoosters();
  }

  return [pack1, pack2, pack3, pack4, pack5, pack6, pack7, pack0];
}

function playerPickEven(draftPacks, itemID, round) {
  let pack0 = removeCardFromBooster(draftPacks[0], itemID);
  let pack1 = AIpickCardFromBooster(draftPacks[1]);
  let pack2 = AIpickCardFromBooster(draftPacks[2]);
  let pack3 = AIpickCardFromBooster(draftPacks[3]);
  let pack4 = AIpickCardFromBooster(draftPacks[4]);
  let pack5 = AIpickCardFromBooster(draftPacks[5]);
  let pack6 = AIpickCardFromBooster(draftPacks[6]);
  let pack7 = AIpickCardFromBooster(draftPacks[7]);

  if (pack0.length == 0 && round < 3) {
    return createEightFakeBoosters();
  }

  return [pack7, pack0, pack1, pack2, pack3, pack4, pack5, pack6];
}

export default function appReducer(state = initialStateC, action) {
  switch (action.type) {
    case "gamecards/JSONLOADED": {
      return {
        ...state,
        allCards: action.payload,
      };
    }
    case "gamecards/generateFakeSet": {
      return {
        ...state,
        gameBoosters: createEightFakeBoosters(),
        progressValue: 0,
        round: 1,
        cardSetFromAPI: getJSON(
          "https://api.scryfall.com/cards/search?order=set&q=e%3Aznr&unique=prints"
        ),
      };
    }

    case "gamecards/pickDraftCard": {
      console.log(state.allCards);
      return {
        ...state,
        gameBoosters:
          state.round % 2 == 1
            ? playerPickOdd(state.gameBoosters, action.payload, state.round)
            : playerPickEven(state.gameBoosters, action.payload, state.round),

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
