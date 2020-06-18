import React, {useEffect, useState} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Switch, Route, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import './vo_style.css'
import { ButtonGroup } from "@material-ui/core";

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

}));


const Vo_main =  () => (
  <Switch>
    <Route exact path='/user/vendor/:id' component={Home}></Route>
    <Route exact path='/user/vendor/:id/2' component={About}></Route>
    <Route exact path='/user/vendor/:id/3' component={Contact}></Route>
  </Switch>
);

const Home = () => (
  <div className='home'>
    <h1>Welcome to my portfolio website</h1>
    <p> Feel free to browse around and learn more about me.</p>
  </div>
);

const About = () => (
  <div className='about'>
    <h1>About Me</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
);

const Contact = () => (
  <div className='contact'>
    <h1>Contact Me</h1>
    <p>You can reach me via email: <strong>hello@example.com</strong></p>
  </div>
);

const Drop = () => (
    <Grid container >
      <Grid item xs>
      <NavLink exact to= '/user/vendor/:id' >
        <Button fullWidth ="1"> 1
        </Button>
      </NavLink>
      </Grid>
      <Grid item xs>
      <NavLink exact to= '/user/vendor/:id/2' >
        <Button fullWidth ="1"> 2
        </Button>
      </NavLink>
      </Grid>
      <Grid item xs>
      <NavLink  to= '/user/vendor/:id/3' >
        <Button fullWidth ="1"> 3
        </Button>
      </NavLink>
      </Grid>
  </Grid> 
) ;

export default function VendorUI(props) {
   const classes = useStyles();
   
  const [vendorInfo, setInfo] = React.useState({})

  useEffect(() => {
    async function load() {
      const res = await axios.get('http://localhost:5000/users/'+props.match.params.id)
      setInfo(res.data)
      console.log(res)
    }
    load()
  },[])


  return(
    <div>
      <h1>Vendor UI</h1>
      <h2>Hello {vendorInfo.name}!</h2>

	<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
            <Drop />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      
  </div>
  <Vo_main />
    </div>
  )
}