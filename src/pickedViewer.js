import React, { useState, Fragment } from "react";
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
import {
  readcosts,
  testOracle,
  scrymf_cost,
  oracleCosts,
} from "./manaconversions.js";

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
                <React.Fragment>
                  {oracleCosts(val.oracle_text).map((val) => val)}
                </React.Fragment>
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
