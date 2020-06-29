import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios"

import DeleteIcon from "@material-ui/icons/Delete";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import { Button, Snackbar, Container } from "@material-ui/core";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    padding: 20,
  },
});

export default function Order(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [details, setDetails] = useState(null)

  useEffect(() => {
    let details = () => props.order.items.map(item => {
      return <li>{item.name}: {item.number}</li>
    })
    setDetails(details)
  }, [])

  // change the status of an order to ready to deliver
  const handleFinish = (orderID) => {
    axios.post('http://localhost:5000/orders/' + orderID + "/" + "Ready", )
      .then(res => console.log(res))
  }


  return (
    <Container>
      <h1 style={{"marginBottom": "auto", "color": "#0356fc", "fontWeight": "bold"}}>Order ID: {props.order._id}</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table" >
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
                style={{"color": "#fc7303", "fontSize":"20px"}}
              >
                {props.order.status}
              </TableCell>
              <TableCell align="right"><ul>{details}</ul></TableCell>
              <TableCell align="right">{props.order.customerID}</TableCell>
              <TableCell align="right">
                <Button>
                  <PlayCircleFilledWhiteRoundedIcon onClick={() => handleFinish(props.order._id)}/>
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Finished!
        </Alert>
      </Snackbar>
    </Container>
  );
}
