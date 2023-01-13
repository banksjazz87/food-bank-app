import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./mobileHamburger.jsx";
import "../assets/styles/navBar.scss";

export default function NavBar() {
  //This will be used to update the current state of the navbar, between mobile and non-mobile.
  const [displayNav, setNavDisplay] = useState("standard");

  //This will be used to update if the hamburger mobile icon has been clicked or not and then alternate between the two states.
  const [mobileMenuClick, setMobileClick] = useState(false);

  //Updates when a full navigation is needed.
  const [fullNav, setFullNav] = useState(false);

  //Listen to the window for any changes in size.
  useEffect(() => {
    window.addEventListener("resize", (event) => {
      let currentWidth = window.innerWidth;
      if ((currentWidth <= 1023) & mobileMenuClick) {
        setNavDisplay("mobile");
      } else {
        setNavDisplay("standard");
      }
    });
  });

  //Check the url to determine if a full navigation menu is needed.
  useEffect(() => {
    let url = window.location.href;

    //List of urls that need a full navigation menu.
    const fullNavUrls = [
      "dashboard",
      "new_applicant",
      "search",
      "current-registered-list",
      "past-registered-list",
      "create-foodbank-list", 
      "printed-applicant-form"
    ];

    for (let i = 0; i < fullNavUrls.length; i++) {
      if (url.includes(fullNavUrls[i])) {
        setFullNav(true);
      }
    }
  }, []);

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

  if (fullNav) {
    return (
      <>
        <nav className={displayNav === "standard" ? "nav_wrapper" : "mobile_nav_wrapper"}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/new_applicant">New Applicant</Link>
          <Link to="/search">Search Applicants</Link>
          <Link to="/foodbank-list-dashboard">Food Bank List Dashboard</Link>
        </nav>
        <HamburgerIcon clickHandler={showNavBar} />
      </>
    );
    
  } else {
    return (
      <>
        <nav className={displayNav === "standard" ? "nav_wrapper" : "mobile_nav_wrapper"}>
          <Link to="/login">Login</Link>
        </nav>
        <HamburgerIcon clickHandler={showNavBar} />
      </>
    );
  }
}
