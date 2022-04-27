import React, {useEffect} from 'react';

import Dashboard from './dashboard/Dashboard'
import axios from 'axios'
import { useParams } from "react-router-dom";

export default function ManagerUI(props) {
  const [managerInfo, setInfo] = React.useState({})
  let params = useParams();
  useEffect(() => {
    axios.get('https://foodcourt-backend.herokuapp.com/users/'+params.id)
    .then(response => {
      setInfo(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  return (
    <Dashboard name={managerInfo.username}/>
  );
}