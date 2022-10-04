import './assets/styles/App.scss';
import './assets/styles/root.scss';
import './assets/styles/library.scss';
import React, {useState} from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./components/mobileHamburger.jsx";

export default function App() {

  const [displayNav, setNavDisplay] = useState(true);

  const [showMobileNav, setMobileNav] = useState(true);


  const showNavBar = () => {
    if (displayNav  && showMobileNav) {
      return;
    }else if(displayNav && showMobileNav === false){
      setNavDisplay(false);
      setMobileNav(true);
    } else {
      setNavDisplay(true);
      setMobileNav(false);
    }
  }

  const showNav = () => {
    setNavDisplay(true);
  }

  

  return (
    <div id="homepage_wrapper">
     <div id="header_wrapper">
      <h1>Food Bank Application</h1>
      </div>
      <nav 
        id="nav_wrapper"
        style={displayNav ? {opacity: "1"} :  {opacity: "0"}}
        onClick={showNavBar}
      >
        <Link to="/login">Login</Link> 
        <Link to="/new_applicant">New Applicant</Link>
        <Link to="/search">Search Applicants</Link>
        <Link to="/current_registered_list">Food Bank List</Link>
        <Link to="/past_registered_list">Past Registered List</Link>
      </nav>
      <HamburgerIcon 
        display={showMobileNav}
        clickHandler={showNavBar} />
    </div>
  );
}






