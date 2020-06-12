import React from 'react';
import Title from './Title';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "auto",
    minWidth: 120,
    maxWidth: 300,
    
  }
}));

// using this to display in list
// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];


export default function SelectItem(props) {
  const classes = useStyles();
  
  const [personName, setPersonName] = React.useState([]);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <React.Fragment>
      <FormControl className={classes.formControl} style={{margin: "0 5px"}} >
        <InputLabel shrink htmlFor="select-multiple-native"
        >
          Item list
          </InputLabel>
        <Select
          multiple
          native
          value={personName}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {props.items.map((item) => (
            <option key={item.name} value={item.name} onClick={() => {props.chooseItemHandle(item)}}>
              {item.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  )
}
