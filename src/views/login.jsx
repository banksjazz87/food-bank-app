import React, { useState } from "react";
import "../assets/styles/login.scss";
import { useNavigate } from "react-router-dom";
import LoginProcedure from "../functions/login.js";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const navigateToNew = () => {
    LoginProcedure.checkCredentials("/login_attempt", {
      currentUser: userName,
      currentPassword: password,
    }).then((data) =>
      LoginProcedure.redirect(data.message, "valid")
        ? navigate("/", { replace: true })
        : alert("invalid credentials")
    );
  };

  return (
    <div id="login_container">
      <form
        action="/login_attempt"
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
        <input type="submit" id="login_submit" value="Submit" />
      </form>
    </div>
  );
}
