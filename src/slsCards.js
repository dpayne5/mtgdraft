import { API } from "aws-amplify";

export async function getCards(setname) {
  let parsedCards = [];
  let cards = await getset(setname);

  console.log(cards);

  for (let card of cards) {
    parsedCards.push({
      set: card.Set,
      cmc: parseFloat(card.cmc),
      imagelink: card.imagelink,
      id: card.id,
      colors: card.colors,
      count: parseInt(card.count),
      loyalty: card.loyalty,
      mana_cost: card.mana_cost,
      name: card.name,
      oracle_text: card.oracle_text,
      power: card.power,
      toughness: card.toughness,
      rarity: card.rarity,
      type: card.type,
    });
  }

  return parsedCards;
}

async function getset(setname) {
  let cards = API.get("mtgAPI", `getset/${setname}`);
  return cards;
}
