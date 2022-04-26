import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Order from "./Order";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "50%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ListFood() {
  const classes = useStyles();

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const id = setInterval(async () => {
      const res = await axios.get("http://localhost:5000/orders/");

      // only get the new order
      let newOrders = res.data.filter((order) => order.status === "New");
      const renderHTML = () => {
        return newOrders.reverse().map((item) => {
          return <Order key={item._id} order={item} />;
        });
      };

      setOrders(renderHTML);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, ["once"]);

  return (
    <div className={classes.paper}>
      <div className={classes.paper}>{orders}</div>
    </div>
  );
}
export default ListFood;
