import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Footer() {

    let navigate = useNavigate();
    const linkClick = (str) => {
        navigate(str, {replace: true});
    }

    return (
        <div id="footer_wrapper">
        <div id="top_footer">
            <div id="applicants_menu">
                <h3>Applicants</h3>
                <h4 onClick={linkClick('/new_applicant')}>New Applicant</h4>
                <h4 onClick={linkClick('/search')}>Search and Edit</h4>
            </div>
            <div id="fb_lists_menu">
                <h3>Foodbank Lists</h3>
                <h4 onClick={linkClick('/create-foodbank-list')}>Create List</h4>
                <h4 onClick={linkClick('/past-registered-list')}>Past List</h4>
                <h4 onClick={linkClick('current-registered-list')}>Current List</h4>
            </div>
        </div>
        <div id="bottom_footer">
            <h5>This Application was created by Chris Banks</h5>
        </div>
        </div>
    )
}