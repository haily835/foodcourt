import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  }
}
));

export default function ManagerStaff() {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")

  return (
    <Paper elevation={3} style={{padding: "30px"}}>
      <Container maxWidth="sm" style={{marginTop: "50px", position: "relative"}}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="idNumber"
                    variant="outlined"
                    required
                    fullWidth
                    value={idNumber}
                    id="idNumber"
                    label="Identity card number"
                    onChange={(e) => {
                      setIdNumber(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <Input
                      inputProps={{ min: 18 }}
                      required
                      name="age"
                      id="age"
                      value={age}
                      type="number"
                      placeholder="Age"
                      color="primary"
                      onChange={(e) => {
                        setAge(e.target.value)
                      }}
                    >
                    </Input>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <RadioGroup 
                      row aria-label="gender" 
                      name="gender" 
                      value={gender} 
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phoneNumber"
                    variant="outlined"
                    required
                    value={phoneNumber}
                    fullWidth
                    id="phoneNumber"
                    label="Phone number"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="role"
                    variant="outlined"
                    required
                    fullWidth
                    id="role"
                    value={role}
                    label="Role"
                    onChange={(e) => {
                      setRole(e.target.value)
                    }}
                  />
                </Grid>
              </Grid>
              <div className={classes.root} style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                <Button 
                  color="primary" 
                  variant="outlined" 
                  onClick={() => {
                    const staff = {
                      "name": name,
                      "email": email,
                      "idNumber": idNumber,
                      "age": age,
                      "phoneNumber": phoneNumber,
                      "gender": gender,
                      "role": role
                    }
                    axios.post('http://localhost:5000/staff/add', staff)
                      .then(res => alert(res.data))
                    setName("")
                    setEmail("")
                    setIdNumber("")
                    setAge(0)
                    setGender("")
                    setPhoneNumber("")
                    setRole("")
                  }}
                >
                  Add
                </Button>
                <Button 
                  color="secondary" 
                  variant="outlined"
                  onClick={() => {
                    setName("")
                    setEmail("")
                    setIdNumber("")
                    setAge(0)
                    setGender("")
                    setPhoneNumber("")
                    setRole("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
