//this generates a set of packs
import React, { useEffect } from "react";

async function getMTGJSON() {
  const mtgData = await fetch(
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aznr&unique=prints"
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      return data;
    });
    //   console.log(response.json());
    //   return response.json();
  });

  //   return mtgData;
  //   console.log(mtgData.json());
  //   return mtgData.json();
}

export default getMTGJSON;
