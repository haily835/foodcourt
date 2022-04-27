import React, {useEffect} from 'react';

import AppBar from './AppBar.component'
import ItemList from './itemList/ItemList.component'
import axios from 'axios'
import { useParams } from "react-router-dom";

export default function CustomerUI(props) {
  const [customerInfo, setInfo] = React.useState({})
  let params = useParams()
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
    <div>
      <AppBar customerInfo={customerInfo}/>
    </div>
  );
}