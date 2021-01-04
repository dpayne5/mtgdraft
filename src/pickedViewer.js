import React, { useState } from "react";
import "./cardPicker.css";
import "./pickedViewerCSS.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "mana-font";

<link
  href="//cdn.jsdelivr.net/npm/mana-font@latest/css/mana.min.css"
  rel="stylesheet"
  type="text/css"
/>;

const printSlash = (power, toughness) => {
  if (power != null && toughness != null) {
    return "/";
  }
  return "";
};

const has_em_dash = (s) => {
  let pattern = /\u2014/;

  if (s.match(pattern) != null) {
    return true;
  }
  return false;
};

const display_type = (s) => {
  if (!has_em_dash(s)) {
    return s;
  }
  let arr = s.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "—") {
      return arr.slice(0, i).join(" ");
    }
  }
};

const readcosts = (mana_costs) => {
  let pattern = /\{\d\}|\{\w\}/g;
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

const scrymf_cost = (s) => {
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

    default:
      return "";
  }
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "50px",
  },
  manaHeading: {
    width: "10%",
    display: "flex",
    flexDirection: "row",
  },
  nameHeading: {
    width: "20%",
  },
  typeHeading: {
    width: "30%",
  },
  oracleDiv: {
    width: "70%",
  },
  ptDetails: {
    width: "8%",
  },
  detailHolder: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function convertManaSymbols() {}

const getMainBoard = (state) => state.mainboard;
const getSideBoard = (state) => state.sideboard;

const PickedViewer = (props) => {
  const mainboard = useSelector(getMainBoard);
  mainboard.sort((a, b) => a.cmc - b.cmc);
  const sideboard = useSelector(getSideBoard);
  sideboard.sort((a, b) => a.cmc - b.cmc);
  const dispatch = useDispatch();

  const classes = useStyles();

  let isval = scrymf_cost("1");
  console.log(mainboard);

  return (
    <div>
      {mainboard.map((val, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography className={classes.manaHeading} color="textPrimary">
              {readcosts(val.mana_cost).map((r) => (
                <div style={{ margin: "10 10 10 10" }}>
                  <i className={r}></i>
                </div>
              ))}
            </Typography>

            <Typography color="textPrimary" className={classes.nameHeading}>
              {val.name}
            </Typography>
            <Typography color="textPrimary" className={classes.typeHeading}>
              {display_type(val.type)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.detailHolder}>
              <Typography color="textPrimary" className={classes.oracleDiv}>
                {val.oracle_text}
              </Typography>
              <Typography color="textSecondary" className={classes.ptDetails}>
                {val.power} {printSlash(val.power, val.toughness)}{" "}
                {val.toughness}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PickedViewer;
