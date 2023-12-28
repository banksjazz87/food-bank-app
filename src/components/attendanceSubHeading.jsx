import React from "react";
import "../assets/styles/attendanceSubHeading.scss";

export default function AttendanceSubHeading(props) {

	return (
		<div id="attendance_sub_heading" className="sticky_heading">
			<p>{props.currentCount}</p>
		</div>
	);
}
