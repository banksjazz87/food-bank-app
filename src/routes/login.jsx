import React, {useState} from "react";
import '../assets/styles/login.scss';

export default function Login() {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
    return (
      <div id="login_container">
        <form action="/login_attempt" onSubmit={(e) => {e.preventDefault(); checkCredentials('/login_attempt', {currentUser: userName, currentPassword: password}).then(data=> alert(data.message));}} method="post">
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