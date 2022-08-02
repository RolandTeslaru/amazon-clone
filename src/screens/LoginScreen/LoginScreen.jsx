import React, { useState } from 'react'
import "./LoginScreen.css"
import {Link} from "react-router-dom"
import {/* Navigate , */useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'


const LoginScreen = () => {

  const navigate = useNavigate();
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const signIn = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email , password)
      .then((auth) => {
        navigate("/");
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email , password)
      .then((auth) => {

        // it succesfuly created user with email and password
        if(auth) {
          navigate("/");
        }  
      })
      .catch(error => alert(error.message));
  }

  return (
    <div className="loginScreen">
        <Link to="/">
            <img src="/images/Amazon-Logo-PNG.png" alt="amazon logo" className='login__logo' />
        </Link>
        <div className="loginScreenContainer">
          <h2>Sign In</h2>
          <form>
            <h4>Email or mobile phone number</h4>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            <h4>Password</h4>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type='submit' onClick={signIn}>Continue</button>
          </form>
          
          <p>By signing-in you agree to nothing. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice .FAKE</p>

          <hr />
          <button onClick={register} className='createAccount-Btn' >Create your Amazon</button>
        </div>
    </div>
  )
}

export default LoginScreen
