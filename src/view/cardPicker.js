import React, { useState } from "react";
import "./styles/cardPicker.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

const selectCurrentPack = (state) => state.gameBoosters[0];

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

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const dispatch = useDispatch();
  const f = props.pickDisplayCard;

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
              <Paper className={classes.paper}>
                <img src={val.imagelink} width="190" height="311"></img>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default connect(mapDispatchToProps)(CardPicker);
