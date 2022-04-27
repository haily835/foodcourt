import React, { useEffect } from "react";

import Navbar from "./Navbar.js";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: 1,
  },
}));

export default function CookUI(props) {
  // this contain use information: name, password, email, role
  const classes = useStyles();
  const [cookInfo, setInfo] = React.useState({});
  let params = useParams()
  useEffect(() => {
    axios
      .get("https://foodcourt-backend.herokuapp.com/users/" + params.id)
      .then((res) => {
        setInfo(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <Navbar name={cookInfo.username}/>
  );
}

//ReactDOM.render(<CookUI />, document.querySelector("#app"));
