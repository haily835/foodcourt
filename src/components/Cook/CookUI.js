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

import ListFood from "../Cook/ListFood.js";
import ItemsList from "../itemList/ItemList.component.js";
import Navbar from "./Navbar.js";

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

export default function CookUI(props) {
  // this contain use information: name, password, email, role
  const classes = useStyles();
  const [cookInfo, setInfo] = React.useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/" + props.match.params.id)
      .then((res) => {
        setInfo(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <Navbar name={cookInfo.username}/>
  );
}

//ReactDOM.render(<CookUI />, document.querySelector("#app"));
