import { createStore } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./reducer";

const fetchMTGJSON = (storeAPI) => (next) => (action) => {
  if (action.type === "gamecards/generateFakeSet") {
    // Make an API call to fetch todos from the server
    let data = fetch(
      "https://api.scryfall.com/cards/search?order=set&q=e%3Aznr&unique=prints"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (d) {
        let cardInfo = [];
        for (let x of d.data) {
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
        storeAPI.dispatch({ type: "gamecards/JSONLOADED", payload: cardInfo });
      });
  }

  return next(action);
};

const middleWareEnhancer = applyMiddleware(fetchMTGJSON);

const store = createStore(rootReducer, middleWareEnhancer);

export default store;
