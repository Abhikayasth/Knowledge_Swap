import React, { useState } from 'react';
import "./SignIn.css";
import Logo from '../img/Logo.png'; 
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  //Toast function.....
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const postData = () => {
    //checking email...
      if(!emailRegex.test(email)){
        notifyA("Invalid Email...")
        return
      }
    //Sending data to server..
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => response.json())
    .then(data => {
      if(data.error){
        notifyA(data.error);
      } else {
        notifyB(data.message);
        console.log(data)
        localStorage.setItem("jwt",data)
        navigate("/");
      }
    }).catch(err => {
      console.log(err);
      notifyA("Something went wrong...");
    });
  }
  return (
    <div className='signIn'>
      <div>
        <div className="loginForm">
          <img className='signUpLogo' src={Logo} alt="" />
          <div><input type="email" name='email' id='email' value={email} placeholder='Email : ' onChange={(e)=>{setEmail(e.target.value)}} /></div>
          <div> <input type="password" name='password' id='password' placeholder='Password :' value={password} onChange={(e)=>{setPassword(e.target.value)}} /> </div>
          <input type="submit" value= "Sign In" onClick={()=>{postData()}} id='login-btn' />
        </div>
        <div className="loginForm2">
          Don't have an account ? 
          <Link to="/signup"><span style={{color:"blue", cursor: "pointer"}}> Sign Up</span></Link>
        </div>
      </div>
    </div>
  )
}
