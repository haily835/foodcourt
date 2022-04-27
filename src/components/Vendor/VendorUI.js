import { NavLink, Route, Routes as Switch } from 'react-router-dom';
import React, {useEffect, useState} from "react"

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Emp_manager from './func/emp_manager'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {NavButton} from './vo_style'
import Rp_manager from './func/rp_manager'
import Sched_manager from './func/sched_manager'
import Toolbar from '@material-ui/core/Toolbar';
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';

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
    <Route exact path='/foodcourt' ></Route>
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
      const res = await axios.get('https://foodcourt-backend.herokuapp.com/users/'+props.match.params.id)
      setInfo(res.data)
      console.log(res)
    }
    load()
  },[])


  return(
    <div>
	<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Drop />
            <NavLink  to= '/foodcourt' >
               <NavButton fullWidth ="1"> Logout
                </NavButton>
            </NavLink>
          
        </Toolbar>
      </AppBar>

      
  </div>
  <Vo_main />

    </div>
  )
}