import React, {useEffect, useState} from 'react';

import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import ItemEditForm from './itemForm/ItemEditForm';
import MinimizeIcon from '@material-ui/icons/Minimize';
import NewItemForm from './itemForm/NewItemForm'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();
  const [items, setItems] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openNewItem, setNewItem] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [editingItem, setEditingItem] = useState({})
  const getItems = () => {
    axios.get('https://foodcourt-backend.herokuapp.com/items/') 
      .then(res => {
        setItems(res.data)
      })
      .catch(error => console.log('can not get data'))
  }

  useEffect(() => {getItems()},[refresh])

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.name}>
                  <TableCell  align="left">
                    <img src={item.imgSrc} width={50} height={50}/>
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell component="th" scope="row">
                    <DeleteIcon onClick={() => {
                        axios.delete('https://foodcourt-backend.herokuapp.com/items/delete/'+item._id)
                          .then(response => { 
                            console.log(response.data)
                            setRefresh(prev => !prev)
                          });
                        // window.location = window.location.href
                      }}
                    />
                    <MinimizeIcon />
                    <EditIcon onClick={() => {
                      setOpenEdit(!openEdit)
                      setEditingItem(item)
                      setNewItem(false)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setNewItem(!openNewItem)
            setOpenEdit(false)
          }}
        >
          Add new item
        </Button>
      </Grid>
     {openEdit && <Grid item xs style={{display: openEdit ? "" :"none"}}>
        <div>
          <ItemEditForm item={editingItem} handleClose={() => {
            setRefresh(prev => !prev)
            setOpenEdit(false);
            }}/>
        </div>
      </Grid>}
      {openNewItem && <Grid item xs style={{display: openNewItem ? "" :"none"}}>
        <div>
          <NewItemForm handleClose={() => {
            setRefresh(prev => !prev)
            setNewItem(false)
            }} />
        </div>
      </Grid>}
    </Grid>
  );
}