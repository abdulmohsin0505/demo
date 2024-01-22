import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'


function Login() {
    const [user,setUser] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }
    
    axios.defaults.withCredentials = true;
    const submitHandler = async(e) => {
    e.preventDefault()
    try {
        const res = await axios.post("http://localhost:3000/login",user)
        if(res.statusText === 'OK'){
            navigate("/dashboard")
        }
    } catch (error) {
        console.log(error)
    }
    }
  return (
    <div>
        <h1>Login Form</h1>
        <form onSubmit={submitHandler}>
            
            <div>
               <label>
                Email
                <input type='email' value={user.email} onChange={handleChange} name='email'/>
            </label> 
            </div>
            
            <div>
            <label>
                Password
                <input type="password" value={user.password} onChange={handleChange} name='password'/>
            </label>
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login