import React, {useEffect, useState} from "react"
import { makeStyle, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';


import  {VoBox, VoButton} from'../vo_style.js'
import {appointments} from '../data/sched'

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];



export function Sched_manager()  {
    const [cur, setCur]  = useState(0);
  
  
    function set_id(id) {
      setCur(id);
    }


    class Sched_display extends React.PureComponent {
      constructor(props) {
        super(props);
    
        this.state = {
          data: appointments,
        };
      }
      render() {
        const { data } = this.state;

        return (
          <Paper>
            <Scheduler
              data={data}
            >
              <ViewState
                defaultCurrentDate="2020-07-5"
              />
              <MonthView />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <Appointments />
            </Scheduler>
          </Paper>
        );
      }
    }
  
    return(
      <div className='Sched_UI'>
        <Sched_display/>
      </div>
    )
  };

 export default Sched_manager