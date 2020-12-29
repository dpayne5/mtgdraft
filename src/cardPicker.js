import React, { useState } from "react";
import "./cardPicker.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

//withstyles as part of the component rewrite to a class
const styles = (theme) => ({
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
});

//rewrite below as a class
class Cp extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.progBarVal);

    this.state = {
      apiURL: "",
      gameDecks: null,
      hasPack: false,
      pickingDeck: [],
      testDeck: localStorage.getItem("persistentDeck"),
      playersDraftedCards: null,
      progressBarFunction: props.progBarChanger,
      progressBarValue: props.progBarVal,
    };
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.pickCard = this.pickCard.bind(this);
  }

  pickCard(val) {
    this.setState({
      pickingDeck: this.state.pickingDeck.filter((value) => value != val),
    });
    this.updateProgressBar();
  }

  componentDidMount() {
    let exampleCards = [
      11,
      22,
      33,
      44,
      55,
      66,
      77,
      88,
      99,
      100,
      110,
      120,
      130,
      140,
      150,
    ];

    this.setState({
      pickingDeck: exampleCards,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    //returns true if size of pickingDeck changes, or if the apiURL changes
    // console.log(this.state.pickingDeck.length);
    console.log("in should component update");
    let currentSize = this.state.pickingDeck.length;
    let nextSize = nextState.pickingDeck.length;

    return !(nextSize == currentSize);
  }

  updateProgressBar() {
    if (this.props.progBarVal + 2.22 >= 99.99) {
      this.props.progBarChanger(100);
    } else {
      this.props.progBarChanger(this.props.progBarVal + 2.22);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="CPContainer" id="cpfield">
        <Grid container className={classes.root} justify="center" spacing={1}>
          {this.state.pickingDeck.map((val, index) => (
            <Grid item sm={2}>
              <ButtonBase onClick={() => this.pickCard(val)} focusRipple>
                <Paper className={classes.paper}>
                  <img
                    src="https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c8c41dd-8551-4ce8-a9be-9b9f65718852.jpg?1608229403"
                    width="190"
                    height="311"
                  ></img>
                </Paper>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
//back to the regular version here

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
    <div className="CPContainer" id="cpfield">
      <Grid container className={classes.root} justify="center" spacing={1}>
        {displayPack.map((
          val,
          index //was currentPack
        ) => (
          <Grid item sm={2}>
            <ButtonBase
              onClick={() =>
                dispatch({ type: "gamecards/pickDraftCard", payload: val })
              }
              focusRipple
            >
              <Paper className={classes.paper}>
                <img
                  src="https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c8c41dd-8551-4ce8-a9be-9b9f65718852.jpg?1608229403"
                  width="190"
                  height="311"
                ></img>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default connect(mapDispatchToProps)(CardPicker);
// withStyles(styles, { withTheme: true });
