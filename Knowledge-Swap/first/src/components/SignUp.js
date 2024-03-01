import React, { useState } from 'react';
import Logo from '../img/Logo.png'; 
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState(""); 
  const [password, setPassword] = useState(""); 

  //Toast function.....
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;

  const postData = () => {
    //checking email...
      if(!emailRegex.test(email)){
        notifyA("Invalid Email...")
        return
      }else if(passRegex.test(password)){
        notifyA("Password must contain at least eight characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for examples,, #,?,!,etc....")
      return
      }
    //Sending data to server..
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password
      })
    }).then(response => response.json())
    .then(data => {
      if(data.error){
        notifyA(data.error);
      } else {
        notifyB(data.message);
        navigate("/signin");
      }
    }).catch(err => {
      console.log(err);
      notifyA("Something went wrong...");
    });
  }

  return (
    <div className='signUp'>
      <div className="form-container">
        <div className="form">
          <img className='signUpLogo' src={Logo} alt="" />
          <p className='loginPara' >
            Sign Up To Join The Knowledge-Swap Community<br /> And <br />Raise Your Skills...
          </p>
          <div>
            <input type="email" name='email' id='email' value={email} placeholder='Email : ' onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <input type="text" name='name' id='name' placeholder='FullName : ' value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div>
            <input type="text" name='username' id='username' placeholder='User-Name :' value={userName} onChange={(e)=>{setuserName(e.target.value)}} /> 
          </div>
          <div>
            <input type="password" name='password' id='password' placeholder='Password :' value={password} onChange={(e)=>{setPassword(e.target.value)}} /> 
          </div>
          <p className='loginPara'>
            By signing up,<br/> You Scale-up and Saw Your Skills...
          </p>
          <input type= "submit" id='submit-btn' value="Sign Up" onClick={postData} />
        </div>
        <div className="form2">
          Already have an account ? 
          <Link to="/signin"><span style={{color: "blue", cursor: "pointer"}}> Sign In</span></Link>
        </div>
      </div>
    </div>
  )
}
