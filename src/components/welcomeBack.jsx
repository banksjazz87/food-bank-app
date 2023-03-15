import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function WelcomeBack() {
    let accountName = Cookies.get('account');
    const navigate = useNavigate();

    if (accountName) {
        return (
            <div id='welcome_back_wrapper'>
                <h1>Welcome Back!</h1>
                <p>{`Would you like to continue as ${accountName}?`}</p>
                <div id="welcome_back_bttn_wrapper">
                    <button
                        type="button"
                        onClick={() => { navigate('/dashboard', { replace: true }); }}
                    >
                        Yes
                    </button>
                    <button 
                        type="no"
                        onClick={() => { 
                            Cookies.remove('account');
                            Cookies.remove('loggedIn');
                            navigate('/login', {replace: true});}}
                    >
                        No
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}