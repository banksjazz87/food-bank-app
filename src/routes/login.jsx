import React from "react";
import '../assets/styles/login.scss';

export default function Login() {
  
  const checkCredentials = async() => {
    
    const response = await fetch('/login_credentials');

    try {
      const data = await response.json();
      alert(data.message);
    } catch(e) {
      console.log('error', e);
    }
  }
    return (
      <div id="login_container">
        <form action="/login_attempt" onSubmit={() => checkCredentials()} method="post">
          <label for="user_name">User Name</label>
          <input type="text" id="user_name" name="user_name" /><br/>
          <label for="password">Password</label>
          <input type="text" id="password" name="password"/><br/>
          <input type="submit" id="login_submit" value="Submit" />
        </form>
      </div>
    );
  }