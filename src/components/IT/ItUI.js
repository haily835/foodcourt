import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink, Switch, Route, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { borders } from "@material-ui/system";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";

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
  button: {
    margin: "auto",
    width: 100
  }
}));

export function Shutdown() {
    
  var para = document.createElement("P");
  para.innerHTML = `
    <p style="padding: 0 40%;">
    System is under maintenance
    </p>
  `;
  document.body.append(para);

  return true;
};

export default function ItUI(props) {
  // this contain use information: name, password, email, role
  const classes = useStyles();
  const [itInfo, setInfo] = React.useState({})

  

  useEffect(() => {
    async function load() {
      const res = await axios.get('http://localhost:5000/users/'+props.match.params.id)
      setInfo(res.data)
      console.log(res)
    }
    load()
  },[])

  return(
    <div>
      <div className={classes.root}>
        <AppBar itInfo={itInfo} position="relative">
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
              {"Hello "}
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
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={()=>{Shutdown()}}
        // startIcon={<DeleteIcon/>}
      >
        Shutdown
      </Button>
    </div>
  )
}