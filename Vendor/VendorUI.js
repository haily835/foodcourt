import React, {useEffect, useState} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Switch, Route, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { borders } from '@material-ui/system';
import ReactDOM from 'react-dom';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';



import Emp_manager from './func/emp_manager'
import Rp_manager from './func/rp_manager'
import Sched_manager from './func/sched_manager'
import {NavButton} from './vo_style'
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border:1,
  },

}));

//Global vars


//
const Vo_main =  () => (
  <Switch>
    <Route exact path='/user/vendor/:id' component={Rp_UI}></Route>
    <Route exact path='/user/vendor/:id/2' component={Emp_UI}></Route>
    <Route exact path='/user/vendor/:id/3' component={Sched_UI}></Route>
  </Switch>
);

//functions 
function refreshPage() {
  window.location.reload(false);
}


const Rp_UI = () => (
  <Rp_manager/>
);



const Emp_UI = () => (
  <Emp_manager/>
);



const Sched_UI= () => (
  <Sched_manager/>
);

const Drop = () => (
    <Grid container >
      <Grid item xs>
      <NavLink exact to= '/user/vendor/:id' >
        <NavButton fullWidth ="1"> View Reports 
        </NavButton>
      </NavLink>
      </Grid>
      <Grid item xs>
      <NavLink exact to= '/user/vendor/:id/2' >
        <NavButton fullWidth ="1"> View Employees
        </NavButton>
      </NavLink>
      </Grid>
      <Grid item xs>
      <NavLink  to= '/user/vendor/:id/3' >
        <NavButton fullWidth ="1"> View Schedules
        </NavButton>
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