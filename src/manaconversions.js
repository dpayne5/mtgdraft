import "mana-font";
import { Fragment } from "react";

export const readcosts = (mana_costs) => {
  let pattern = /\{\d\}|\{\w\}|\+\d|\-\d/g;
  let scrycosts = mana_costs.match(pattern);
  let mfcosts = [];
  if (scrycosts == null) {
    return [];
  }
  for (let s of scrycosts) {
    mfcosts.push(scrymf_cost(s));
  }
  return mfcosts;
};

export const testOracle = () => {
  //   return <i className="ms ms-r ms-cost ms-shadow"></i>;
  let x = ["ok", <i className="ms ms-r ms-cost ms-shadow"></i>, "bye"];
  return <Fragment>{x.map((val) => val)}</Fragment>;

  //   return <div>{x.join(" ")}</div>;
};

export const scrymf_cost = (s) => {
  //   if (s[0] == "+") {
  //     console.log("BOOBAY");
  //   }
  //   if (s[0] == "-") {
  //     console.log("DOOBIE");
  //   }
  let stripped = s.substring(1, s.length - 1);

  switch (stripped) {
    case "G":
      return "ms ms-g ms-cost ms-shadow";
    case "R":
      return "ms ms-r ms-cost ms-shadow";
    case "B":
      return "ms ms-b ms-cost ms-shadow";
    case "U":
      return "ms ms-u ms-cost ms-shadow";
    case "W":
      return "ms ms-w ms-cost ms-shadow";
    case "X":
      return "ms ms-x ms-cost ms-shadow";
    case "1":
      return "ms ms-1 ms-cost ms-shadow";
    case "2":
      return "ms ms-2 ms-cost ms-shadow";
    case "3":
      return "ms ms-3 ms-cost ms-shadow";
    case "4":
      return "ms ms-4 ms-cost ms-shadow";
    case "5":
      return "ms ms-5 ms-cost ms-shadow";
    case "6":
      return "ms ms-6 ms-cost ms-shadow";
    case "7":
      return "ms ms-7 ms-cost ms-shadow";
    case "8":
      return "ms ms-8 ms-cost ms-shadow";
    case "9":
      return "ms ms-9 ms-cost ms-shadow";
    case [0] == "+":
      console.log("we here!");

    default:
      return s;
  }
};
