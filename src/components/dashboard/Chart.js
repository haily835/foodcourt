import { Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React, {useEffect, useState} from 'react';

import Title from './Title'
import axios from 'axios'
import { useTheme } from '@material-ui/core/styles';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const dataDefault = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart(props) {
  const theme = useTheme();
  const [data, setData] = useState([dataDefault]) 

  useEffect(
    () => {
      const id= setInterval(async () => {
        const res = await axios.get('https://foodcourt-backend.herokuapp.com/orders/week')
        console.log(res)
        setData(res.data)
        props.handlePrint(res.data)
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    ['once'],
  );


  return (
    <React.Fragment>
      <Title>7 days period</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales (VND)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
