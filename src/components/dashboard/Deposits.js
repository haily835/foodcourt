import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [total, setTotal] = useState(0)
  const curr = new Date()

  useEffect(
    () => {
      let returnValue = 0
      let currDate = new Date()
      const id= setInterval(async () => {
        const res = await axios.get('http://localhost:5000/orders/' + currDate.toDateString())
        console.log(res)
        setTotal(res.data.total)
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    ['once'],
  );

  
  return (
    <React.Fragment>
      <Title>Total payment</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {curr.toDateString()}
      </Typography>
    </React.Fragment>
  );
}
