import React, { useState, useEffect } from "react";
import "../assets/styles/attendanceSubHeading.scss";

export default function AttendanceSubHeading(props) {
	const [stickyHeader, setSticky] = useState(false);
	const [currentView, setCurrentView] = useState("Check In Sheet");

	useEffect(() => {
		const mainHeader = document.getElementById("current_fb_list_header_wrapper");
		const headerLocation = mainHeader.getBoundingClientRect().height;

		document.addEventListener("scroll", () => {
			let currentLocation = window.scrollY;
			if (currentLocation > headerLocation) {
				setSticky(true);
			} else {
				setSticky(false);
			}
		});
	});

	useEffect(() => {
		const checkInSheet = document.getElementById("check_in_form");

		if (checkInSheet) {
			const checkInSheetLocation = checkInSheet.getBoundingClientRect().height;

			document.addEventListener("scroll", () => {
				let screenLocation = window.scrollY;

				if (screenLocation > checkInSheetLocation) {
					setCurrentView("Attendance Sheet");
				} else {
					setCurrentView("Check In Sheet");
				}
			});
		}
	});

	return (
		<div 
            id="attendance_sub_heading_wrapper" 
            className={stickyHeader ? "sticky_heading" : "non_sticky_header"}
        >
			<div
				id="attendance_sub_heading"
			>
				<p>{props.currentCount}</p>
			</div>
            <div id="current_view_heading" style={stickyHeader ? {display: ""} : {display: "none"}}>
                <p>{`Currently Editing ${currentView}`}</p>
            </div>
		</div>
	);
}
