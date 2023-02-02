import React from "react";
import "../assets/styles/hamburger.scss";

export default function HamburgerIcon(props) {
  return (
    <div id="hamburg_wrapper" onClick={props.clickHandler}>
      <div className="hamburger_line"></div>
      <div className="hamburger_line"></div>
      <div className="hamburger_line"></div>
    </div>
  );
}
