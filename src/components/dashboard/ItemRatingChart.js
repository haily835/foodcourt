import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default function ItemRatingChart(props) {
  
  let data = []
  if (props.item && props.item.rating) {
    data.push({"name": "Poor", "votes": props.item.rating.oneStar})
    data.push({"name": "OK", "votes": props.item.rating.twoStar})
    data.push({"name": "Good", "votes": props.item.rating.threeStar})
    data.push({"name": "Good+", "votes": props.item.rating.fourStar})
    data.push({"name": "Exellent", "votes": props.item.rating.fiveStar})
  } else {
    data = [
      {
        "name": "Poor",
        "votes": 4000,
      },
      {
        "name": "OK",
        "votes": 3000,
      },
      {
        "name": "Good",
        "votes": 2000,
      },
      {
        "name": "Good+",
        "votes": 2780,
      },
      {
        "name": "Exellent",
        "votes": 1890,
      }
    ]
  }
  

  return (
    <React.Fragment>
      <Title>Customer votes</Title>
        <ResponsiveContainer>
          <BarChart style={{margin: "0 10px"}} width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" fill="#D55672" />
          </BarChart>
        </ResponsiveContainer>
    </React.Fragment>
  )
}