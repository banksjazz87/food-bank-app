import React, {useState} from "react";
import '../assets/styles/login.scss';
import  { useNavigate } from "react-router-dom";



export default function Login() {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();


  const checkCredentials = async (url = '', data = {}) => {
    const response = await fetch (url, {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      redirect: 'follow',
      referrerPolicy:'no-referrer', 
      body: JSON.stringify(data)
    });
    
    return response.json();

  }

  const redirect = (message, confirmed) => {
    if (message === confirmed) {
      return true;
    } 
  }

    return (
      <div id="login_container">
        <form 
          action="/login_attempt" 
          onSubmit={(e) => {
            e.preventDefault(); 
            checkCredentials('/login_attempt', {currentUser: userName, currentPassword: password}).then(data=> redirect(data.message, "valid") ? navigate("/", {replace: true}) : alert('invalid credentials'));
            }} 
            method="post">
          <label for="user_name">User Name</label>
          <input 
            type="text" 
            id="user_name" name="user_name" 
            onChange={(e) => setUserName(e.target.value)}
          /><br/>

          <label for="password">Password</label>
          <input 
            type="text" 
            id="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <input 
            type="submit" 
            id="login_submit" 
            value="Submit"   
          />
        </form>
      </div>
    );
  }