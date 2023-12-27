import React, { useState, useEffect } from "react";

export default function AttendanceSubHeading() {
    const [stickyHeading, setStickyHeading] = useState(false);
    const [currentAttendanceView, setCurrentAttendanceView] = useState('');

    useEffect(() => {
        const header = document.getElementById('current_fb_list_header_wrapper');
        let headerPosition = header.getBoundingClientRect();

        window.addEventListener('scroll', () => {
            let scrollPosition = window.scrollY;
            if (scrollPosition > headerPosition.bottom) {
                setStickyHeading(true);
            } else {
                setStickyHeading(false);
            }
        });
    });

   
	return (
		<div id="sticky_heading" style={stickyHeading ? {backgroundColor: "red"}: {backgroundColor: "blue"}}>
			<p> This is the subheading </p>
		</div>
	);
}
