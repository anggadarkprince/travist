import axios from "axios";
import React, {useRef, useState} from "react";
import "./Login.css";
import RoomIcon from "@mui/icons-material/Room";
import {Modal} from "../Modal/Modal";
import {Link} from "react-router-dom";

export default function Login({onAuthMenuClicked, showLogin, setShowLogin, setCurrentUsername, myStorage}) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false)
        try {
            const res = await axios.post("users/login", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            setCurrentUsername(res.data.user.username);
            myStorage.setItem('user', res.data.user.username)

            onAuthMenuClicked('explore', '/explore')

            usernameRef.current.value = ''
            passwordRef.current.value = ''
        } catch (err) {
            setError(true)
            setErrorMessage(err.response.data.message || 'Something went wrong!')
        }
    };

    const onAuthClick = (e, menu) => {
        e.preventDefault()
        onAuthMenuClicked(menu, e.target.href)
    }

    return (
        <Modal show={showLogin} onCloseCallback={() => setShowLogin(false)} modalStyle={{maxWidth: '320px'}}>
            <div className="authLogoWrapper">
                <div className="authLogo">
                    <RoomIcon />
                    <span>Travist</span>
                </div>
                <p className="authLogoSubtitle">Login into your account</p>
            </div>
            <form onSubmit={handleSubmit}>
                {error && <span className="flash-message failure">{errorMessage || 'Something went wrong!'}</span>}
                <div className="input-section">
                    <label htmlFor="loginUsername">Username</label>
                    <input autoFocus placeholder="Username" id="loginUsername" ref={usernameRef}/>
                </div>
                <div className="input-section">
                    <label htmlFor="password">Password</label>
                    <input type="password" min="6" placeholder="Password" id="loginPassword" ref={passwordRef}/>
                </div>
                <button className="loginBtn" type="submit">
                    Login
                </button>
                <p className="authFooter">
                    Don't have an account, <Link to="/register" onClick={(e) => onAuthClick(e, 'register')}>register here</Link>
                </p>
            </form>
        </Modal>
    );
}