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
import Axios from "axios";
import Order from "./Order";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ListFood() {
  const classes = useStyles();
  const [state, setState] = useState({ listOrder: [] });

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/orders/",
    }).then((rs) => {
      setState({
        listOrder: rs.data,
      });
    });
  }, []);

  const renderHTML = () => {
    return state.listOrder.map((item) => {
      return <Order key={item._id} order={item} />;
    });
  };

  return (
    <div className={classes.paper}>
      <div className={classes.paper}>{renderHTML()}</div>
    </div>
  )
}
export default ListFood;
