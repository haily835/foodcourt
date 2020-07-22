import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar.js";

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/" + props.match.params.id)
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
