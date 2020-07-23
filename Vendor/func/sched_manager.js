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

import {data} from '../data/sched'
import {employees} from '../data/employee'


const currentDate = new Date();
const views = ['day', 'week', 'workWeek', 'month'];

const renderAppointment = (model) => {
  return (
      <React.Fragment>
          <i>{model.appointmentData.Employees[0]}</i>
          {(model.appointmentData.Employees.length >1) &&
            <i>,{model.appointmentData.Employees[1]}</i>
          }
          {(model.appointmentData.Employees.lenght >2) &&
            <i>,...</i>
          }
      </React.Fragment>
  );
}


export function Sched_manager()  {
    class Sched_display extends React.Component {
      constructor(props) {
        super(props);
        this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
      }

      render() {
        return (
          <Scheduler
            dataSource={data}
            views={views}
            defaultCurrentView="month"
            defaultCurrentDate={currentDate}
            height={600}
            firstDayOfWeek={1}
            startDayHour={8}
            endDayHour={18}
            appointmentRender= {renderAppointment}
            onContentReady={this.onContentReady}
             onAppointmentFormOpening={this.onAppointmentFormOpening}
          >
          <Resource
            dataSource={data}
            fieldExpr="Employees"
          />
          </Scheduler> 
        )
      };
    
    

    onAppointmentFormOpening(data) {
      let form = data.form;

  
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
          label:{
            text:"Start time"
          },
          dataField: 'startDate',
          editorType: 'dxDateBox', 
          editorOptions: 
            {
            width: '100%',
            type: 'time',
            }
        },
        {
          label:{
            text:"End time"
          },
          dataField: 'endDate',
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
          dataField: 'Employees',
          editorType: 'dxTagBox',
          editorOptions: {
            width: '100%',
            items:employees,
            displayExpr: 'text',
            valueExpr: 'text',
            searchEnabled: true,
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