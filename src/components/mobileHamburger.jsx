import React from "react";
import "../assets/styles/hamburger.scss";

export default function HamburgerIcon(props) {
  return (
    <div 
      id="hamburg_wrapper"
      onClick={props.clickHandler}
      >
      <div class="hamburger_line"></div>
      <div class="hamburger_line"></div>
      <div class="hamburger_line"></div>
    </div>
  );
}
