import React, {useEffect, useState} from "react"
import { makeStyle, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

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
        <VoButton fullWidth = {1} onClick ={() => set_id(rp_data.id -1)} height="25%">
        {rp_data.name}
        </VoButton>
      )
    } );

    class Rp_display extends React.Component {
  
      render() {
        let image;
        if(cur == 0) {image = <img src= {rp_1} width= "100%" height='380px' />} else
        if(cur == 1) {image = <img src= {rp_2} width= "100%" height='380px' />} else
        if(cur == 2) {image = <img src= {rp_3} width= "100%" height='380px' />}
        return(

            <React.Fragment>
             {/* <h4>{rp_data[cur].link}</h4> */}
              {image}
            </React.Fragment>
          )
        }
      }
  
  
    return(
      <div className='home'>
        <Grid container spacing = {3}>
            <Grid item xs ={2}> </Grid>
            
            <Grid container item xs={8}  spacing = {1}direction="row" justify="center" >
            {/* <div style={{backgroundColor: "blue"}}> */}
              <Grid item xs = {8}>
                <Box color = "inherit" border={1} height= {1}> <Rp_display /></Box>
              </Grid>
              <Grid item xs = {4}>
              <VoBox color = "inherit" border={1} height= {1}>
                  <h4 align="center"> Select Report</h4>
                  <Box height = "75%">
                  {Rp_list}
                  </Box>
              </VoBox>

              </Grid>
            {/* </div> */}
            </Grid>

            <Grid item xs ={2}> </Grid>
        </Grid>
    </div>
    )
  };

 export default Rp_manager