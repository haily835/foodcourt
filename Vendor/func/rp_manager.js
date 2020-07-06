import React, {useEffect, useState} from "react"
import { makeStyle, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import  {VoBox, VoButton} from'../vo_style.js'
import rp_data from '../data/report.json'
import rp_1 from '../data/reports/A.png'
import rp_2 from '../data/reports/B.png'
import rp_3 from '../data/reports/C.png'




export function Rp_manager() {
    const [cur, setCur]  = useState(0);
  
  
    function set_id(id) {
      setCur(id);
    }
    
    const Rp_list = rp_data.map((rp_data) => {
      return (
        <VoButton fullWidth = {1} onClick ={() => set_id(rp_data.id -1)}>
        {rp_data.name}
        </VoButton>
      )
    } );

    class Rp_display extends React.Component {
  
      render() {
        let image;
        if(cur == 0) {image = <img src= {rp_1}/>} else
        if(cur == 1) {image = <img src= {rp_2}/>} else
        if(cur == 2) {image = <img src= {rp_3}/>}
        return(

            <React.Fragment>
              <h4>{rp_data[cur].link}</h4>
              {image}
            </React.Fragment>
          )
        }
      }
  
  
    return(
      <div className='home'>
        <Grid container spacing = {3}>
            <Grid item xs ={2}> </Grid>
            <Grid item xs = {6}>
              <Box color = "inherit" border={1}> <Rp_display /></Box>
            </Grid>
            <Grid item xs = {2}>
            <VoBox color = "inherit" border={1}>0
                <h4 align="center"> Select Report</h4>
                {Rp_list}
            </VoBox>
            </Grid>
            <Grid item xs ={2}> </Grid>
        </Grid>
    </div>
    )
  };

 export default Rp_manager