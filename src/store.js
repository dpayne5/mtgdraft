import { createStore } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./reducer";

async function F(data) {
  console.log("inside of F()");
  let cards = [];
  if (data == null) {
    return cards;
  }

  if (data.has_more) {
    let nextdata = await fetch(data.next_page)
      .then(function (response) {
        return response.json();
      })
      .then(function (newdata) {
        return F(newdata);
      });

    cards = cards.concat(nextdata);
  }
  return cards.concat(parseCards(data));
}

const parseCards = (data) => {
  let cards = [];

  for (let x of data.data) {
    if (x.booster === true) {
      if (!x.type_line.startsWith("Basic Land")) {
        cards.push({
          id: x.mtgo_id,
          name: x.name,
          imagelink:
            typeof x.image_uris != "undefined" ? x.image_uris["normal"] : null,
          mana_cost: x.mana_cost,
          cmc: x.cmc,
          card_faces: x.card_faces,
          type: x.type_line,
          oracle_text: x.oracle_text,
          power: x.power,
          toughness: x.toughness,
          rarity: x.rarity,
        });
      } else {
        if (x.full_art === true) {
          cards.push({
            id: x.mtgo_id,
            name: x.name,
            imagelink:
              typeof x.image_uris != "undefined"
                ? x.image_uris["normal"]
                : null,
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
      }
    }
  }
  for (let y of cards) {
    if (y.imagelink == null) {
      y.name = y.card_faces[0]["name"];
      y.mana_cost = y.card_faces[0]["mana_cost"];
      y.type = y.card_faces[0]["type"];
      y.oracle_text = y.card_faces[0]["oracle_text"];
      y.power = y.card_faces[0]["power"];
      y.toughness = y.card_faces[0]["toughness"];
      y.imagelink = y.card_faces[0]["image_uris"]["png"];
      y.type = y.card_faces[0].type_line;
    }
  }

  return cards;
};

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
        let bg = Promise.resolve(F(d)).then((result) =>
          storeAPI.dispatch({ type: "gamecards/JSONLOADED", payload: result })
        );

        // let cardInfo = parseCards(d);

        // console.log(cardInfo);
        // storeAPI.dispatch({ type: "gamecards/JSONLOADED", payload: cardInfo });
      });
  }

  return next(action);
};

const middleWareEnhancer = applyMiddleware(fetchMTGJSON);

const store = createStore(rootReducer, middleWareEnhancer);

export default store;
