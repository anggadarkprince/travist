import axios from "axios";
import React, {useContext, useRef, useState} from "react";
import "./Login.css";
import RoomIcon from "@mui/icons-material/Room";
import {Modal} from "../Modal/Modal";
import {Link} from "react-router-dom";
import AuthContext from "../../AuthContext";

export default function Login({showLogin, setShowRegister, setShowLogin, setAuthData}) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const auth = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false)
        try {
            const res = await axios.post("auth/login", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            const authData = {
                user: res.data.user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            }
            setAuthData(authData, () => {
                setShowRegister(false)
                setShowLogin(false)
            })

            usernameRef.current.value = ''
            passwordRef.current.value = ''
        } catch (err) {
            console.log(err)
            setError(true)
            setErrorMessage(err.response?.data?.message || 'Something went wrong!')
        }
    };

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
                    Don't have an account, <Link to="/register" onClick={(e) => {
                    e.preventDefault()
                    setShowLogin(false)
                    setShowRegister(true)
                }}>register here</Link>
                </p>
            </form>
        </Modal>
    );
}