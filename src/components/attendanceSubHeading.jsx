import React, { useState, useEffect } from "react";
import "../assets/styles/attendanceSubHeading.scss";

export default function AttendanceSubHeading(props) {
	const [stickyHeader, setSticky] = useState(false);

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

	return (
		<div
			id="attendance_sub_heading_wrapper"
			className={stickyHeader ? "sticky_heading" : "non_sticky_header"}
		>
			<div id="attendance_sub_heading">
				<p> {props.currentCount} </p>
			</div>
		</div>
	);
}
