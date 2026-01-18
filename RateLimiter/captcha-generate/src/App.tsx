import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile';
import './App.css'
import axios from 'axios'

function App() {
    const [token,setToken] = useState("");
    return (
        <div>
            <input type="text" placeholder='OTP'/> <br /><br />
            <input  type="text" placeholder='New Password' /> <br /><br />

            <Turnstile onSuccess={(token)=>{
                setToken(token);
            }} siteKey='..'></Turnstile>

            <button onClick={()=>{
                axios.post("http://localhost:3000/reset-password",{
                    email:"nk@gmail.com",
                    otp:"997081",
                    newPassword:"hii@420",
                    token:token
                })
            }} >Update Password</button>
        </div>
    )
}

export default App
