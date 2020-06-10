import React, {useEffect} from 'react';
import AppBar from './AppBar.component'
import axios from 'axios'
import ItemList from './itemList/ItemList.component'
export default function CustomerUI(props) {
  const [customerInfo, setInfo] = React.useState({})

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
    <div>
      <AppBar customerInfo={customerInfo}/>
    </div>
  );
}