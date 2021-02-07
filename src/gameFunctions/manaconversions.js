import "mana-font";
import { Fragment } from "react";

export const oracleCosts = (oracle_text) => {
  let totalReturn = [];
  // console.log(oracle_text);
  let test = oracle_text.split("\n");
  // console.log(test);

  for (let i = 0; i < test.length; i++) {
    let a = test[i].split(/\s/);
    let pattern = /\{\d\}|\{\w\}|\+\d:|\-\d:|\W\d:|0:|\{\d\/\w\}|IV|III|II|I$|I,/g;
    let r = [];
    for (let i = 0; i < a.length; i++) {
      let matches = a[i].match(pattern);
      if (matches) {
        for (let m of matches) {
          // console.log(m);
          r.push(oracleConversions(m));
        }
        r.push(" ");
      } else {
        r.push(a[i] + " ");
      }
    }
    totalReturn.push(<p>{r}</p>);
  }
  return totalReturn;
};

export const readcosts = (mana_costs) => {
  let pattern = /\{\d\}|\{\w\}|\+\d:|\-\d:|0:/g;
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

const oracleConversions = (s) => {
  //check for loyalty symbolsbefore stripping

  if (s[0] !== "{" && s[s.length - 1] === ":") {
    if (s[0] === "+") {
      let x = `ms ms-loyalty-up ms-loyalty-${s[1]}`;
      return <i class={x}></i>;
    } else if (s[0] !== "0") {
      let x = `ms ms-loyalty-down ms-loyalty-${s.slice(1, s.length - 1)}`; //s[1]
      return <i class={x}></i>;
    } else {
      let x = "ms ms-loyalty-zero ms-loyalty-0";
      return <i class={x}></i>;
    }
  }

  //check for saga symbols before stripping
  if (s === "IV") {
    return <i class="ms ms-saga ms-saga-4 ms-2x"></i>;
  }

  if (s === "III") {
    return <i class="ms ms-saga ms-saga-3 ms-2x"></i>;
  }

  if (s === "II") {
    return <i class="ms ms-saga ms-saga-2 ms-2x"></i>;
  }

  if (s === "I") {
    return <i class="ms ms-saga ms-saga-1 ms-2x"></i>;
  }

  if (s === "I,") {
    return <i class="ms ms-saga ms-saga-1 ms-2x"></i>;
  }

  let stripped = s.substring(1, s.length - 1);
  // console.log("s : ", s, "stripped= ", stripped);
  // console.log(stripped);
  if (stripped.length > 1) {
    let x = `ms ms-${stripped[0].toLowerCase()}${stripped[
      stripped.length - 1
    ].toLowerCase()} ms-cost ms-shadow`;
    console.log("x", x);
    return <i class={x}></i>;
  }
  switch (stripped) {
    case "G":
      return <i class="ms ms-g ms-cost ms-shadow"></i>;
    case "R":
      return <i class="ms ms-r ms-cost ms-shadow"></i>;
    case "B":
      return <i class="ms ms-b ms-cost ms-shadow"></i>;
    case "U":
      return <i class="ms ms-u ms-cost ms-shadow"></i>;
    case "W":
      return <i class="ms ms-w ms-cost ms-shadow"></i>;
    case "X":
      return <i class="ms ms-x ms-cost ms-shadow"></i>;
    case "C":
      return <i class="ms ms-c ms-cost ms-shadow"></i>;
    case "T":
      return <i class="ms ms-tap ms-cost ms-shadow"></i>;
    case "1":
      return <i class="ms ms-1 ms-cost ms-shadow"></i>;
    case "2":
      return <i class="ms ms-2 ms-cost ms-shadow"></i>;
    case "3":
      return <i class="ms ms-3 ms-cost ms-shadow"></i>;
    case "4":
      return <i class="ms ms-4 ms-cost ms-shadow"></i>;
    case "5":
      return <i class="ms ms-5 ms-cost ms-shadow"></i>;
    case "6":
      return <i class="ms ms-6 ms-cost ms-shadow"></i>;
    case "7":
      return <i class="ms ms-7 ms-cost ms-shadow"></i>;
    case "8":
      return <i class="ms ms-8 ms-cost ms-shadow"></i>;
    case "9":
      return <i class="ms ms-9 ms-cost ms-shadow"></i>;

    default:
      return s;
  }
};

export const scrymf_cost = (s) => {
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
