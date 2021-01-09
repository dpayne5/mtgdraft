// the top navigation bar for the app
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// styling for regular grid container and grid items
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "blue",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100px",
  },
}));

const DraftOptions = () => {
  const classes = makeStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="topNavDiv">
        <div className="userOptionsBar">
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={1}>
              <Button color="primary">Login</Button>
            </Grid>
            <Grid item xs={1}>
              <Button color="primary">Sign up</Button>
            </Grid>
          </Grid>
        </div>
        <h1 classname="appTitle">MTG DRAFT : A Project Application</h1>
        <div className="deckChoiceBar">
          <Grid container spacing={2} justify="space-evenly">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Zendikar Rising
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>New Draft</MenuItem>
              <MenuItem onClick={handleClose}>Continue</MenuItem>
            </Menu>

            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Core set 2021
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>New Draft</MenuItem>
              <MenuItem onClick={handleClose}>Continue</MenuItem>
            </Menu>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              THEROS BEYOND DEATH
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>New Draft</MenuItem>
              <MenuItem onClick={handleClose}>Continue</MenuItem>
            </Menu>
          </Grid>
        </div>
      </div>
      {/* end of topNavDiv */}
      <div className="gameSection">
        <div className="progressArea"></div>
        <div className="gameArea"></div>
      </div>
    </div>

    //start of game area
  );
};

// simple line to get started
function NavbarTop() {
  //   return DraftOptions();
  return DraftOptions();
}

export default NavbarTop;
