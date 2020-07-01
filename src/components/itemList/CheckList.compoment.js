import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, TableFooter } from '@material-ui/core';
import AddCircelOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircelOutline from '@material-ui/icons/RemoveCircleOutline';
import Item from './Item.component';
import {createOrderData} from './ItemList.component'
import Orders from '../dashboard/Orders';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

export default function CheckList(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [orderPostData, setOrderPostData] = useState({})
  const [order, setOrder] = useState([])
  let total = 0;
  useEffect(()=>{
    setItems(props.items)
    setOrderPostData(props.items, props.customerID)
    setOrder(props)
  }, [props])

  const handleIncrement = (_item) => { 
    props.items.map((item) => {
      if(_item._id === item._id){
          item.number++;
      }
      console.log(order)
      setOrderPostData(createOrderData(props.items, props.customerID))  
    })
  }

  const handleDecrement = (_item) => {
    props.items.map((item) => {
      if(_item._id === item._id && item.number > 0){
        item.number--;
        if(item.number === 0){
          props.items.splice(props.items.indexOf(item), 1);
        }
        console.log(order)
        setOrderPostData(createOrderData(props.items, props.customerID))
      }  
    })
  }

  const calculateTotal = () => {
    props.items.map((item) => {
      total += item.price * item.number;
    })
    return total
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Dessert</TableCell>
            <TableCell align="center">Number</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="center">
              <IconButton> 
                <RemoveCircelOutline onClick={() => handleDecrement(item)}/>
              </IconButton>
              {item.number}
              <IconButton> 
                <AddCircelOutline onClick={() => handleIncrement(item)}/>
              </IconButton>
              </TableCell>
              <TableCell align="left">{thousands_separators(item.price)}</TableCell>
              <TableCell align="right">{thousands_separators(item.number * item.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="center"><h1><b> Total:  </b></h1></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"><h1><b> { thousands_separators(calculateTotal()) }</b></h1></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
