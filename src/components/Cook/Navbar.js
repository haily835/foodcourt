import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography } from "@material-ui/core";

import ListFood from "../Cook/ListFood.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: 1,
  },
}));

export default function Navbar(props) {
  // this contain use information: name, password, email, role
  const classes = useStyles();
  const [cookInfo, setInfo] = useState([]);

  return (
    <div>
      <div className={classes.root}>
        <AppBar cookInfo={cookInfo} position="relative" >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              // component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {"Hello " + props.name}
            </Typography>

            <IconButton color="inherit">
              <Button
                variant="contained"
                onClick={() => (window.location = "/foodcourt")}
              >
                Log Out
              </Button>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <ListFood />
    </div>
  );
}
