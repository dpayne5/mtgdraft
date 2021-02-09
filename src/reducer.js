import {
  removeCardFromBooster,
  partitionBasicLands,
  partitionSetIntoCommons,
  partitionSetIntoMythics,
  partitionSetIntoRares,
  partitionSetIntoUncommons,
  createBoosterFromSet,
  pickCardFromBooster,
  shouldIncrementRound,
  AIpickCardFromBooster,
  createEightBoosters,
  playerPickOdd,
  playerPickEven,
} from "./gameFunctions/cardpackFunctions.js";

import store from "./store.js";

const initialStateC = {
  gameBoosters: [[]],
  mainboard: [],
  sideboard: [],
  progressValue: 0,
  round: 1,
  cardSetFromAPI: null,
  allCards: null,
  lands: null,
  commons: null,
  uncommons: null,
  rares: null,
  mythics: null,
  currentSetRatings: {},
};

async function getRatings(setName) {
  let pathStart = setName.toUpperCase();
  let f = `${pathStart}-ratings.txt`;

  console.log(f);
  let result = await fetch(f) //../
    .then((response) => response.text())
    .then((text) => {
      console.log("text is", text);
      store.dispatch({ type: "gamecards/assignRatings", payload: text });
    });

  return result;
}

const clone = (obj) => {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
};

const findCardIndex = (board, card) => {
  let index = -1;

  for (let i = 0; i < board.length; i++) {
    if (card.name === board[i].name) {
      return i;
    }
  }
  return index;
};

export default function appReducer(state = initialStateC, action) {
  switch (action.type) {
    case "gamecards/JSONLOADED": {
      let data = "initial data ";
      let _setRatings = getRatings(action.payload[0]["set"]);
      console.log(_setRatings);

      let _commons = partitionSetIntoCommons(action.payload);
      let _uncommons = partitionSetIntoUncommons(action.payload);
      let _rares = partitionSetIntoRares(action.payload);
      let _mythics = partitionSetIntoMythics(action.payload);
      let _lands = partitionBasicLands(action.payload);
      return {
        ...state,
        lands: _lands,
        commons: _commons,
        uncommons: _uncommons,
        rares: _rares,
        mythics: _mythics,
        gameBoosters: createEightBoosters(
          _lands,
          _commons,
          _uncommons,
          _rares,
          _mythics
        ),

        allCards: action.payload,
        mainboard: [],
        sideboard: [],
      };
    }

    case "gamecards/assignRatings": {
      console.log("inside workaround");
      let ratings = JSON.parse(action.payload);
      console.log(ratings);
      // console.log(action.payload);
      return { ...state, currentSetRatings: ratings };
    }
    case "gamecards/generateSets": {
      return {
        ...state,
        progressValue: 0,
        round: 1,
      };
    }
    case "gamecards/swaptoSB": {
      let cardToMove = action.payload;

      let updatedMB = [...state.mainboard];
      let updatedSB = [...state.sideboard];

      let index = findCardIndex(updatedMB, cardToMove);
      let theCard = updatedMB[index];

      if (updatedMB[index].count > 1) {
        updatedMB[index].count -= 1;
      } else {
        updatedMB.splice(index, 1);
      }

      let sbIndex = findCardIndex(updatedSB, cardToMove);
      if (sbIndex == -1) {
        let copyCard = clone(cardToMove);
        copyCard.count = 1;
        updatedSB.push(copyCard);
      } else {
        updatedSB[sbIndex].count += 1;
      }

      return {
        ...state,
        mainboard: updatedMB,
        sideboard: updatedSB,
      };
    }

    case "gamecards/swaptoMB": {
      let cardToMove = action.payload;
      let updatedMB = [...state.mainboard];
      let updatedSB = [...state.sideboard];

      let index = findCardIndex(updatedSB, cardToMove);

      if (updatedSB[index].count > 1) {
        updatedSB[index].count -= 1;
      } else {
        updatedSB.splice(index, 1);
      }

      let mbIndex = findCardIndex(updatedMB, cardToMove);
      if (mbIndex == -1) {
        let copyCard = clone(cardToMove);
        copyCard.count = 1;
        updatedMB.push(copyCard);
      } else {
        updatedMB[mbIndex].count += 1;
      }

      return {
        ...state,
        mainboard: updatedMB,
        sideboard: updatedSB,
      };
    }

    case "gamecards/pickDraftCard": {
      let newCard = pickCardFromBooster(state.gameBoosters[0], action.payload);
      let copyMainBoard = [...state.mainboard];
      let shouldAdd = true;

      for (let item of copyMainBoard) {
        if (newCard.name === item.name) {
          shouldAdd = false;
          item.count += 1;
        }
      }

      if (shouldAdd) {
        copyMainBoard.push(newCard);
      }
      return {
        ...state,
        mainboard: copyMainBoard,

        gameBoosters:
          state.round % 2 === 1
            ? playerPickOdd(
                state.gameBoosters,
                action.payload,
                state.round,
                state.lands,
                state.commons,
                state.uncommons,
                state.rares,
                state.mythics
              )
            : playerPickEven(
                state.gameBoosters,
                action.payload,
                state.round,
                state.lands,
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
