import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import React, { useState, useEffect } from "react";
import HamburgerIcon from "../components/mobileHamburger.jsx";
import DashBoardNavBar from "../components/dashBoardNav.jsx";

export default function Dashboard() {

  //This will be used to update the current state of the navbar, between mobile and non-mobile.
  const [displayNav, setNavDisplay] = useState("standard");

  //This will be used to update if the hamburger mobile icon has been clicked or not and then alternate between the two states.
  const [mobileMenuClick, setMobileClick] = useState(false);


  //Listen to the window for any changes in size.
  useEffect(() => {
    window.addEventListener("resize", (event) => {
      let currentWidth = window.innerWidth;
      if (currentWidth <= 1023 & mobileMenuClick) {
        setNavDisplay("mobile");
        console.log("mobile");
      } else {
        setNavDisplay("standard");
        console.log("standard");
      }
    });
  });

  //This will be the function used on the onClick event for the hamburger icon.
  const showNavBar = () => {
    if (mobileMenuClick) {
      setMobileClick(false); 
      setNavDisplay("standard");
    } else {
      setMobileClick(true);
      setNavDisplay("mobile");
      
    }
  };

  return (
    <div id="homepage_wrapper">
      <div id="header_wrapper">
        <h1>Food Bank Application</h1>
      </div>
      <DashBoardNavBar 
        display={displayNav} />
      <HamburgerIcon clickHandler={showNavBar} />
    </div>
  );
}
