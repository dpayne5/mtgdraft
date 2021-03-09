import React, { useState } from "react";
import "./styles/cardPicker.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { submitDraft } from "../slsPut.js";

const selectCurrentPack = (state) => state.gameBoosters[0];
const selectAiOne = (state) => state.playerOnePicks;
const selectMainBoard = (state) => state.mainboard;

const mapDispatchToProps = (dispatch) => ({
  pickDisplayCard(index) {
    return () => {
      dispatch({ type: "gamecards/pickDraftCard", payload: index });
    };
  },
});

const CardPicker = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: "auto",

      alignContent: "space-between",
    },
    paper: {
      height: 311,
      width: 190,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const displayPack = useSelector(selectCurrentPack);

  const draftedCards = useSelector(selectAiOne);

  const classes = useStyles();
  const dispatch = useDispatch();
  const f = props.pickDisplayCard;

  const maincards = useSelector(selectMainBoard);

  const urlPath = "https://card-images-dp.s3.us-east-2.amazonaws.com/";

  if (draftedCards.length == 45) {
    submitDraft(maincards);
    return (
      <div className="CPContainer">
        <Typography component="div" color="textSecondary">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h5.fontSize"
            m={1}
            textAlign="center"
          >
            <p>Draft Complete!</p>
            <p>
              Organize your deck in the Current Picks tab or start a new Draft.
            </p>
          </Box>
        </Typography>
      </div>
    );
  }

  return (
    <div className="CPContainer">
      <Grid
        container
        className={classes.root}
        align="center"
        justify="center"
        alignItems="center"
        width="95%"
        spacing={1}
      >
        {displayPack.map((val, index) => (
          <Grid item sm={2}>
            <ButtonBase
              onClick={() =>
                dispatch({ type: "gamecards/pickDraftCard", payload: val })
              }
              focusRipple
            >
              {/* https://card-images-dp.s3.us-east-2.amazonaws.com/79126.jpeg */}
              <Paper className={classes.paper}>
                <img
                  src={`https://mtgcards-dpw.s3-us-west-1.amazonaws.com/${val.id}.jpeg`}
                  width="190"
                  height="311"
                ></img>

                {/* <img src={val.imagelink} width="190" height="311"></img> */}
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default connect(mapDispatchToProps)(CardPicker);
