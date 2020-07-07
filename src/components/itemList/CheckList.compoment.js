import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, TableFooter, Button } from '@material-ui/core';
import AddCircelOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircelOutline from '@material-ui/icons/RemoveCircleOutline';
import DeleteIconOutline from '@material-ui/icons/DeleteOutline'

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

export default function CheckList(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(()=>{
    setItems(props.items.items)
  }, [props])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Number</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="center">
              <IconButton> 
                <RemoveCircelOutline onClick={() => props.handleDecrement(item)}/>
              </IconButton>
              {item.number}
              <IconButton> 
                <AddCircelOutline onClick={() => props.handleIncrement(item)}/>
              </IconButton>
              </TableCell>
              <TableCell align="left">{thousands_separators(item.price)}</TableCell>
              <TableCell align="right">{thousands_separators(item.number * item.price)}
              <IconButton> 
                <DeleteIconOutline onClick={() => props.handleDelete(item)}/>
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="center"><h1><b> Total:  </b></h1></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"><h1><b> {thousands_separators(props.items.total)}</b></h1></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
