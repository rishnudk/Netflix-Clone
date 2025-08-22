import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='login'>Login
    <img src= {logo} className='login-logo' alt="" />
    <div className="login-form">
      <h1>Sign In</h1>
      <form action=""></form>
    </div>
    </div>
  )
}

export default Login