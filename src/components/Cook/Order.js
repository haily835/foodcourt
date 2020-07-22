import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import Alert from "@material-ui/lab/Alert";
import { Button, Snackbar, Container, ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    padding: 10,
  },
});

export default function Order(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [details, setDetails] = useState(null);
  const [snackPack, setSnackPack] = React.useState([]);
  const [snackPack1, setSnackPack1] = React.useState([]);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const handleClick = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    setOpen(true);
  };

  const handleOpen = (message) => {
    setOpen(false);
    setSnackPack1((prev) => [...prev, { message, key: new Date().getTime() }]);
    setOpen1(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChoose = (message) => {
    if (message == "Do you want to serve this order?") {
      handleFinish(props.order._id);
    }
    if (message == "Do you want to deny this order?") {
      handleDeny(props.order._id);
    }
  };

  useEffect(() => {
    let details = () =>
      props.order.items.map((item) => {
        return (
          <li>
            {item.name}: {item.number}
          </li>
        );
      });
    setDetails(details);
  }, []);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open && !open1) {
      // Close an active snack when a new one is added
      setOpen(false);
    }

    if (snackPack1.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack1[0] });
      setSnackPack1((prev) => prev.slice(1));
      setOpen1(true);
    } else if (snackPack1.length && messageInfo && !open && open1) {
      // Close an active snack when a new one is added
      setOpen1(false);
    }
  }, [snackPack, snackPack1, messageInfo, open, open1]);

  // change the status of an order to ready to finished
  const handleFinish = (orderID) => {
    handleOpen("The order is finished.");
    axios
      .post("http://localhost:5000/orders/" + orderID + "/" + "Ready")
      .then((res) => console.log(res));
  };

  // change the status of an order to denied
  const handleDeny = (orderID) => {
    handleOpen("The order is denied.");
    axios
      .post("http://localhost:5000/orders/" + orderID + "/" + "Denied")
      .then((res) => console.log(res));
  };

  const handleExited = () => {
    setOpen(false)
    setMessageInfo(undefined);
  };

  return (
    <Container>
      <h3
        style={{ marginBottom: "auto", color: "#0356fc", fontWeight: "bold" }}
      >
        Order ID: {props.order._id}
      </h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Dish</TableCell>
              <TableCell align="right">Customer ID</TableCell>
              <TableCell align="right">Accept/Deny</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align="right"
                style={{ color: "#fc7303", fontSize: "18px" }}
              >
                {props.order.status}
              </TableCell>
              <TableCell align="right">
                <ul>{details}</ul>
              </TableCell>
              <TableCell align="right">{props.order.customerID}</TableCell>
              <TableCell align="right">
                <ButtonGroup>
                  <Button>
                    <PlayCircleFilledWhiteRoundedIcon
                      onClick={() =>
                        handleClick("Do you want to serve this order?")
                      }
                    />
                  </Button>
                  <Button>
                    <DeleteIcon
                      delay={3000}
                      onClick={() =>
                        handleClick("Do you want to deny this order?")
                      }
                    />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={() => handleChoose(messageInfo.message)}
            >
              Agree
            </Button>
            <Button
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={() => handleClose()}
            >
              Disagree
            </Button>
          </React.Fragment>
        }
      />
      <Snackbar
        open={open1}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Alert variant="filled" open={open1} onClose={handleClose} severity="success">
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </Container>
  );
}
