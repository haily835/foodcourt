import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import ItemList from './itemList/ItemList.component'

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }
}));

export default function CustomerAppBar(props) {
  const classes = useStyles();

  const [items, setItems] = useState([])
  const [results, setResult] = useState([])

  const getItems = () => {
    axios.get('http://localhost:5000/items/') 
      .then(res => {
        setItems(res.data)
        setResult(res.data)
      })
      .catch(error => console.log('can not get data'))
  }

  useEffect(getItems,[])

  const handleChange = (e) => {
    let searchString =  e.target.value.toLowerCase();
    let searchResult = items.filter(item => {
      if(item.name.toLowerCase().search(searchString) !== -1 ) {
        return item
      }
    })
    console.log(searchResult)
    setResult(searchResult)
  }

  return (
    <div>
      <AppBar color='lemonchiffon' position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              {"Hello, " + props.customerInfo.username} 
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              position="relative"
              onChange={handleChange}
            />
          </div>
          <Button 
            color="inherit"
            onClick={() => window.location = '/foodcourt'}
          >Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <ItemList items={results} customerID={props.customerInfo._id}/>
    </div>
  );
}