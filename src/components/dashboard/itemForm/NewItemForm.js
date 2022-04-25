import React from 'react';
import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(1),
  },
}));


export default function NewItemForm() {
  const classes = useStyles()
  const [isChangeMade, setChangeMade] = useState(false)
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState(0)
  const [itemDescription, setItemDescription] = useState("")
  const [itemSrc, setItemUrl] = useState("")
  
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Add New Item
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={itemName}
            autoComplete="given-name" 
            onChange={(e)=>{
              setItemName(e.target.value)
              setChangeMade(true)
            }}
          />
        </Grid>
        <Grid item xs={12} >
          <Input 
            type="number" 
            required 
            inputProps={{step:"1000"}}
            value={itemPrice}
            onChange={(e) => {
              setItemPrice(e.target.value)
              setChangeMade(true)
            }}
          >
          </Input>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="imgSrc"
            name="imgSrc"
            label="Image Url"
            fullWidth
            multiline
            autoComplete="url"
            value={itemSrc}
            onChange={(e) => {
              setItemUrl(e.target.value)
              setChangeMade(true)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            autoComplete="description"
            value={itemDescription}
            onChange={(e) => {
              setItemDescription(e.target.value)
              setChangeMade(true)
            }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        color="primary"
        disabled={!isChangeMade}
        className={classes.submit}
        onClick={()=>{
            axios.post('http://localhost:5000/items/add', {"imgSrc": itemSrc, "name": itemName, "price": itemPrice, "description": itemDescription})
          // window.location = window.location
        }}
      >
        Submit
      </Button>
      </Paper>
    </div>
  )
}