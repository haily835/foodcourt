import React, {useEffect, useState} from "react"
import axios from "axios"


export default function ItUI(props) {
  // this contain use information: name, password, email, role
  const [itInfo, setInfo] = React.useState({})

  useEffect(() => {
    async function load() {
      const res = await axios.get('http://localhost:5000/users/'+props.match.params.id)
      setInfo(res.data)
      console.log(res)
    }
    load()
  },[])

  return(
    <div>
      <h1>It UI</h1>
      <h2>Hello {itInfo.name}</h2>
    </div>
  )
}