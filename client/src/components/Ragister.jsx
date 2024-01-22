import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login() {
    const [user,setUser] = useState({
        username : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e) => {
    e.preventDefault()
    try {
        const res = await axios.post("http://localhost:3000/register",user)
        if(res.statusText === 'OK'){
            navigate("/login")
        }
    } catch (error) {
        console.log(error)
    }
    
    }
  return (
    <div>
        <h1>Register Form</h1>
        <form onSubmit={submitHandler}>
            <div>
            <label>
                Username
                <input type="text" value={user.username} onChange={handleChange} name='username'/>
            </label>
            </div>
            
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
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Login