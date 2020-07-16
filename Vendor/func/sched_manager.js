import React, {useEffect, useState} from "react"
import { makeStyle, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Scheduler, { Resource } from 'devextreme-react/scheduler';

import  {VoBox, VoButton, SchedForm} from'../vo_style.js'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import {sched} from '../data/sched'
import {employees} from '../data/employee'

const currentDate = new Date();
const views = ['day', 'week', 'workWeek', 'month'];




function AppointmentTemplate(model) {
  const data = model.Employees;
  return (
    <div> 
      {
        data.map((data) => {
          return (
            <p> {data.text} </p>
          )
        })
      }
    </div>
  
  ) 
};

export function Sched_manager()  {
    class Sched_display extends React.Component {
      constructor(props) {
        super(props);

        //this.getAppointmentTooltipTemplate = this.getAppointmentTooltipTemplate.bind(this);
        this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
      }

      render() {
        return (
          <Scheduler
            dataSource={sched}
            views={views}
            defaultCurrentView="month"
            defaultCurrentDate={currentDate}
            height={600}
            firstDayOfWeek={1}
            startDayHour={8}
            endDayHour={18}
            //appointmentRender={AppointmentTemplate}
            // appointmentTooltipRender={this.getAppointmentTooltipTemplate}
            // onContentReady={this.onContentReady}
             onAppointmentFormOpening={this.onAppointmentFormOpening}
          >
         
          </Scheduler> 
        )
      }
    
    

    onAppointmentFormOpening(data) {
      let form = data.form
       // movieInfo = getMovieById(data.appointmentData.movieId) || {},
       // startDate = sched.appointmentData.startDate;
  
      form.option('items', [
        // {
        //   dataField: 'titleBox',
        //   editorType: 'dxTextBox',
        //   editorOptions:
        //     {
        //       width: '100%',
              
        //     }
        // },
        {
          dataField: 'startTime',
          editorType: 'dxDateBox', 
          editorOptions: 
            {
            width: '100%',
            type: 'time',
            }
        },
        {
          dataField: 'endTime',
          editorType: 'dxDateBox',
          editorOptions: 
            {
            width: '100%',
            type: 'time',
            }
        },
        {
          label: {
            text: 'Employees'
          },
          name: 'Employees',
          dataField: 'Employees',
          editorType: 'dxTagBox',
          editorOptions: {
            width: '100%',
            items: employees,
            displayExpr: 'text',
            valueExpr: 'id',
            searchEnabled: true,
           // value: 
          }
          
        }
    ])
    }
  }
    return(
      <div className='Sched_UI'>
        <Grid container>
          <Grid xs={2}></Grid>
          <Grid xs = {8}>
            <Sched_display/>
          </Grid>  
          <Grid xs={2}></Grid>
        </Grid>
      </div>
    )
  };

 export default Sched_manager