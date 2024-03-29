import React, { useState } from "react";
import "../assets/styles/login.scss";
import { useNavigate } from "react-router-dom";
import LoginProcedure from "../functions/login.js";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const navigateToNew = () => {
    LoginProcedure.checkCredentials("/login-attempt", {
      currentUser: userName,
      currentPassword: password,
    }).then((data) => {
      if (LoginProcedure.redirect(data.message, "valid")) {
        navigate("/dashboard", {replace: true});
      } else {
        alert("Invalid Credentials");
      }
    }
    );
  };

  return (
    <div id="login_container">
      <form
        action="/login-attempt"
        onSubmit={(e) => {
          e.preventDefault();
          navigateToNew();
        }}
        method="post"
      >
        <label for="user_name">User Name</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />

        <label for="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          class="submit_button"
          type="submit"
          id="login_submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
