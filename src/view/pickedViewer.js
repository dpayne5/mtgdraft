import React, { useState, Fragment } from "react";
import "./styles/cardPicker.css";
import "./styles/pickedViewerCSS.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  readcosts,
  testOracle,
  scrymf_cost,
  oracleCosts,
} from "../gameFunctions/manaconversions.js";

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

const displayStartLoyalty = (loyalty) => {
  return `ms ms-loyalty-start ms-loyalty-${loyalty} ms-4x`;
};

const mbMetaInfo = (mainboard) => {
  let creatures = 0;
  let spells = 0;
  let oneCosts = 0;
  let twoCosts = 0;
  let threeCosts = 0;
  let fourCosts = 0;
  let fiveCosts = 0;
  let sixCosts = 0;
  let sevenCosts = 0;
  let eightCosts = 0;

  for (let card of mainboard) {
    if (card.type.includes("Creature") || card.type.includes("Planeswalker")) {
      creatures += 1;
    } else if (!card.type.includes("Land")) {
      spells += 1;
    } else {
      let a = 1; //just a do nothing line till i get this figured out correctly
    }
    switch (card.cmc) {
      case 1:
        oneCosts += 1;
        break;

      case 2:
        twoCosts += 1;
        break;
      case 3:
        threeCosts += 1;
        break;
      case 4:
        fourCosts += 1;
        break;
      case 5:
        fiveCosts += 1;
        break;
      case 6:
        sixCosts += 1;
        break;
      case 7:
        sevenCosts += 1;
        break;
      case 8:
        eightCosts += 1;
        break;
      default:
        break;
    }
  }
  return [
    creatures,
    spells,
    oneCosts,
    twoCosts,
    threeCosts,
    fourCosts,
    fiveCosts,
    sixCosts,
    sevenCosts,
    eightCosts,
  ];
};

const has_em_dash = (s) => {
  let pattern = /\u2014/;

  if (s.match(pattern) != null) {
    return true;
  }
  return false;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
  qtyHeading: {
    width: "5%",
  },
  oracleDiv: {
    width: "70%",
    // fontSize: "90%",
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
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  let isval = scrymf_cost("1");
  let [
    numCreatures,
    numSpells,
    oneCosts,
    twoCosts,
    threeCosts,
    fourCosts,
    fiveCosts,
    sixCosts,
    sevenCosts,
    eightCosts,
  ] = mbMetaInfo(mainboard);
  // console.log(mbMetaInfo(mainboard));

  const handleChange = (event, newValue) => {
    console.log("this should trigger swapping between tabs");
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="pickedOverViewContainer">
      <div className="metaInfo">
        <Metainfo
          costsData={[
            oneCosts,
            twoCosts,
            threeCosts,
            fourCosts,
            fiveCosts,
            sixCosts,
            sevenCosts,
            eightCosts,
          ]}
        />
        <div className="creatureSpellTextHolder">
          <Typography color="textPrimary" variant="h6">
            {`Creatures: ${numCreatures}`}
          </Typography>
          <Typography color="textPrimary" variant="h6">
            {`Spells: ${numSpells}`}
          </Typography>
        </div>
      </div>
      <div className="pickedCardViewContainer">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Mainboard" {...a11yProps(0)} />
          <Tab label="SideBoard" {...a11yProps(1)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div className="Mainboard">
          <Mainboard />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="Sideboard">
          <Sideboard />
        </div>
      </TabPanel>
    </div>
  );
};

const Metainfo = (props) => {
  console.log(props.costsData);

  let [c, s, one, two, three, four, five] = [3, 3, 1, 2, 0, 1, 2, 0];
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: [
      {
        label: "",
        barThickness: "flex",
        borderWidth: 0.5,
        data: props.costsData,
      },
    ],
  };
  return (
    <div className="metaCMCcontainer">
      <Bar
        data={data}
        width={300}
        height={100}
        options={{
          tooltips: { enabled: false },
          hover: { mode: null },
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        }}
      />
    </div>
  );
};

const Mainboard = (props) => {
  const mainboard = useSelector(getMainBoard);
  mainboard.sort((a, b) => a.cmc - b.cmc);
  const dispatch = useDispatch();
  const classes = useStyles();

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
            <Typography color="textPrimary" className={classes.qtyHeading}>
              {`Qty: ${val.count}`}
            </Typography>
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
              <Typography
                color="textPrimary"
                variant="body2"
                className={classes.oracleDiv}
              >
                <React.Fragment>
                  {oracleCosts(val.oracle_text).map((val) => val)}
                </React.Fragment>
              </Typography>
              <Typography color="textSecondary" className={classes.ptDetails}>
                {val.loyalty ? (
                  <React.Fragment>
                    <i class={displayStartLoyalty(val.loyalty)}></i>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {val.power} {printSlash(val.power, val.toughness)}{" "}
                    {val.toughness}
                  </React.Fragment>
                )}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const Sideboard = (props) => {
  const sideboard = useSelector(getSideBoard);
  sideboard.sort((a, b) => a.cmc - b.cmc);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div>
      {sideboard.map((val, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography color="textPrimary" className={classes.qtyHeading}>
              {`Qty: ${val.count}`}
            </Typography>
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
              <Typography
                color="textPrimary"
                variant="body2"
                className={classes.oracleDiv}
              >
                <React.Fragment>
                  {oracleCosts(val.oracle_text).map((val) => val)}
                </React.Fragment>
              </Typography>
              <Typography color="textSecondary" className={classes.ptDetails}>
                {val.loyalty ? (
                  <React.Fragment>
                    <i class={displayStartLoyalty(val.loyalty)}></i>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {val.power} {printSlash(val.power, val.toughness)}{" "}
                    {val.toughness}
                  </React.Fragment>
                )}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PickedViewer;
