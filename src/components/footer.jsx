import React from 'react';
import {useNavigate} from 'react-router-dom';
import "../assets/styles/footer.scss";

export default function Footer() {

    let navigate = useNavigate();
    const linkClick = (str) => {
        navigate(str, {replace: true});
    }

    return (
        <div id="footer_wrapper">
        <div id="top_footer">
            <div className="menu_items">
                <a href="/new_applicant">New Applicant</a>
                <a href='/search'>Applicants</a>
                <a href='/create-foodbank-list'>Create List</a>
                <a href='/past-registered-list'>Past Lists</a>
                <a href='current-registered-list'>Current List</a>
            </div>
        </div>
        <div id="bottom_footer">
            <p>This Application was created</p>
            <p>by Chris Banks</p>
        </div>
        </div>
    )
}