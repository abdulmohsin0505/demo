import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [message,setMessage] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/dashboard")
      if(res.data.login){
        setMessage(res.data.message)
        navigate("/dashboard")
      }else{
        navigate("/")
      }
      } catch (error) {
        console.log(error)
      }
    }
    auth()
  })
  return (
    <h1>Dashboard {message}</h1>
  )
}

export default Dashboard