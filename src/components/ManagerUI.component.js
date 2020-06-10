import React, {useEffect} from 'react';
import Dashboard from './dashboard/Dashboard'
import axios from 'axios'
export default function ManagerUI(props) {
  const [managerInfo, setInfo] = React.useState({})

  useEffect(() => {
    axios.get('http://localhost:5000/users/'+props.match.params.id)
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