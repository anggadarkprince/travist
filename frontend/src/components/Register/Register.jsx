import React, {useRef, useState} from 'react';
import './Register.css'
import RoomIcon from '@mui/icons-material/Room';
import axios from "axios";
import {Modal} from "../Modal/Modal";
import {Link} from "react-router-dom";

export default function Register({ onAuthMenuClicked, showRegister, setShowRegister }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setError(false);
        setSuccess(false);

        try {
            await axios.post("users/register", newUser);
            setError(false);
            setSuccess(true);

            usernameRef.current.value = '';
            emailRef.current.value = '';
            passwordRef.current.value = '';
        } catch (err) {
            setError(true);
        }
    };

    const onAuthClick = (e, menu) => {
        e.preventDefault()
        onAuthMenuClicked(menu, e.target.href)
    }

    return (
        <Modal show={showRegister} onCloseCallback={() => setShowRegister(false)}>
            <div className="authLogoWrapper">
                <div className="authLogo">
                    <RoomIcon />
                    <span>Travist</span>
                </div>
                <p className="authLogoSubtitle">Join thousands contributors</p>
            </div>
            <form onSubmit={handleSubmit}>
                {success && <span className="flash-message success">Successfully register. You can login now!</span>}
                {error && <span className="flash-message failure">Something went wrong!</span>}
                <div className="input-section">
                    <label htmlFor="username">Username</label>
                    <input autoFocus placeholder="Username" id="username" ref={usernameRef} />
                </div>
                <div className="input-section">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email address" id="email" ref={emailRef} />
                </div>
                <div className="input-section">
                    <label htmlFor="password">Password</label>
                    <input type="password" min="6" placeholder="Password" id="password" autoComplete="off" ref={passwordRef}/>
                </div>
                <button className="registerBtn" type="submit">
                    Register
                </button>
                <p className="authFooter">
                    Already have an account, <Link to="/login" onClick={(e) => onAuthClick(e, 'login')}>login here</Link>
                </p>
            </form>
        </Modal>
    );
}
