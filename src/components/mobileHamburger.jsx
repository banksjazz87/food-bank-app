import React from "react";
import "../assets/styles/hamburger.scss";

export default function HamburgerIcon(props) {
  return (
    <div 
      id="hamburg_wrapper"
      onClick={props.clickHandler}
      style={props.display ? {display: ""} : {display: "none"}}>
      <div class="hamburger_line"></div>
      <div class="hamburger_line"></div>
      <div class="hamburger_line"></div>
    </div>
  );
}
