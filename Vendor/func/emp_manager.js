import React, {useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import {employees} from '../data/employee.js'
import  {VoBox, VoButton} from'../vo_style.js'

export function Emp_manager() {
    const [cur, setCur]  = useState(1);
  
    const empl_list = employees.map((employees) => {
      return (
      <VoButton fullWidth = {1} onClick ={() => set_id(employees.id)}>
          {employees.text}
      </VoButton>
      )
      }
    ) ;
  
    function set_id(id) {
      setCur(id);
    }
    
    class Emp_info extends React.Component {
  
      render() {
        return(
  
            <React.Fragment >

            <div padding = "10px">
              <h2 align = "center">Employee information  </h2>
              <bl/>
              <h4> Employee id  = {employees[cur-1].id}</h4>
              <h4> Name: {employees[cur-1].text} </h4>  
              <h4> Phone Number: {employees[cur-1].phone} </h4>
              <h4> Email: {employees[cur-1].email}</h4>
            </div>
            </React.Fragment>
          )
        }
      }
  
  
    return(
      <div className='Emp_UI'>
      <Grid container spacing = {3}>
        <Grid item xs ={2}> </Grid>
        <Grid item xs = {4}>
  
          <List >
            {empl_list}
          </List>
  
  
        </Grid>
        <Grid item xs = {4}>
          <Box color = "inherit" border={1} paddingLeft={5} height={1}> 
          <Emp_info />
          </Box>
        </Grid>
        <Grid item xs ={2}> </Grid>
      </Grid>
  
    </div>
    )
  };

 export default Emp_manager