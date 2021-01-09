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
};

export default function appReducer(state = initialStateC, action) {
  switch (action.type) {
    case "gamecards/JSONLOADED": {
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
      };
    }
    case "gamecards/generateSets": {
      return {
        ...state,
        progressValue: 0,
        round: 1,
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
