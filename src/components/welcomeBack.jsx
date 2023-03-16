import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "../assets/styles/welcomeBack.scss";

export default function WelcomeBack() {
    let accountName = Cookies.get('account');
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowWelcome(true);
        }, 1000);
    }, [showWelcome]);

    if (accountName) {
        return (
            <div 
                id='welcome_back_wrapper'
                style={showWelcome ? {opacity: '1'} : {display: "0"}}
                    >
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
                        type="button"
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