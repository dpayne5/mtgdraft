import React from "react";
import "./styles/gameSection.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Cp from "./cardPicker.js";
import PickedViewer from "./pickedViewer.js";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    width: "24%",
    textAlign: "center",
  },
}));

const useProgStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const selectProgress = (state) => state.progressValue;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    display: "flex",
    alignItems: "center",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const GameSection = (props) => {
  const [progBarValue, setProgBarValue] = React.useState(0);
  const displayProgressValue = useSelector(selectProgress);

  const handleProgBarChange = (event, progVal) => {
    setProgBarValue(progVal);
  };

  const bclasses = useProgStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("this should trigger swapping between tabs");
    setValue(newValue);
  };

  const [cardsetlink, setCardSetLink] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="newtopbar">
        <div className="infoContainer">
          <Button
            variant="outlined"
            color="default"
            disableElevation
            onClick={handleClickOpen}
          >
            How To Play
          </Button>
        </div>
        <h1 style={{ textAlign: "center" }}>MTG Draft: A Project App</h1>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Draft is a popular and competitive format for Magic: The
              Gathering! Players choose one card per pack before constructing a
              deck with a minimum of 40 cards (27 cards you will pick and 13
              lands provided by the event host).
              <p>
                The purpose of this app is to let you get free practice against
                simulated opponents playing basic strategy. Click any of the set
                names to get started.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container>
          <Grid item xs={4} align="center">
            <Button
              color="primary"
              size="large"
              onClick={() => {
                dispatch({
                  type: "gamecards/generateSets",
                  payload: "znr",
                });
              }}
            >
              Zendikar Rising
            </Button>
          </Grid>
          <Grid item xs={4} align="center">
            <Button
              color="primary"
              size="large"
              onClick={() =>
                dispatch({
                  type: "gamecards/generateSets",
                  payload: "khm",
                })
              }
            >
              Kaldheim
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            align="center"
            onClick={() =>
              dispatch({
                type: "gamecards/generateSets",
                payload: "thb",
              })
            }
          >
            <Button color="primary" size="large">
              Theros Beyond Death
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="gsContainer">
        <div className="gameProgressContainer">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Draft" {...a11yProps(0)} />
            <Tab label="Current Picks" {...a11yProps(1)} />
          </Tabs>

          <div className={bclasses.root}>
            <BorderLinearProgress
              variant="determinate"
              value={displayProgressValue}
            />
          </div>
        </div>

        <TabPanel value={value} index={0}>
          <div className="cardPickerContainer">
            <Cp
              progBarChanger={setProgBarValue}
              progBarVal={progBarValue}
              cslink={cardsetlink}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="pickedViewer">
            <PickedViewer />
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default GameSection;
