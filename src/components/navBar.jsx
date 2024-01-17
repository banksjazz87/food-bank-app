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

  //The name of the page that the user is currently on.
	const [currentPage, setCurrentPage] = useState("");

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
	}, []);

	//Check the url to determine if a full navigation menu is needed.
	useEffect(() => {
		let url = window.location.pathname;

		setCurrentPage(url);

		//List of urls that need a full navigation menu.
		const fullNavUrls = ["/dashboard", "/new_applicant", "/search", "/current-registered-list", "/past-registered-list", "/create-foodbank-list", "/printed-applicant-form", "/foodbank-list-dashboard"];

		if (fullNavUrls.indexOf(url) > -1) {
			setFullNav(true);
		} else {
			setFullNav(false);
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

  const checkForPageMatch = (page, navTitle) => {
    if (page === navTitle) {
      return true;
    } else {
      return false;
    }
  }

	if (fullNav) {
		return (
			<>
				<nav className={displayNav === "standard" ? "nav_wrapper" : "mobile_nav_wrapper"}>
					<Link to="/dashboard" className={checkForPageMatch(currentPage, '/dashboard') ? "highlight_nav_item" : ""}> Dashboard </Link> 
          <Link to="/new_applicant" className={checkForPageMatch(currentPage, '/new_applicant') ? "highlight_nav_item" : ""}> New Applicant </Link> 
          <Link to="/search" className={checkForPageMatch(currentPage, '/search') ? "highlight_nav_item" : ""}> Search Applicants </Link> 
          <Link to="/foodbank-list-dashboard" className={checkForPageMatch(currentPage, '/foodbank-list-dashboard') ? "highlight_nav_item" : ""}> Food Bank List Dashboard </Link>
				</nav>
				<HamburgerIcon clickHandler={showNavBar} />
			</>
		);
	} else {
		return (
			<>
				<nav className={displayNav === "standard" ? "nav_wrapper" : "mobile_nav_wrapper"}>
					<Link to="/login" className={checkForPageMatch(currentPage, '/login') ? "highlight_nav_item" : ""}> Login </Link>
				</nav>
				<HamburgerIcon clickHandler={showNavBar} />
			</>
		);
	}
}
