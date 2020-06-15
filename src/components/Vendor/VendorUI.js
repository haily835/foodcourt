import React, {useEffect, useState} from "react"
import axios from "axios"

export default function VendorUI(props) {

  const [vendorInfo, setInfo] = React.useState({})

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
      <h1>Vendor UI</h1>
      <h2>Hello {vendorInfo.name}!</h2>
    </div>
  )
}