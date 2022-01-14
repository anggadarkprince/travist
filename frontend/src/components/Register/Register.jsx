import React, {useRef, useState} from 'react';
import './Register.css'
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

export default function Register({ setShowRegister }) {
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
    return (
        <div className="registerOverlay">
            <div className="registerContainer">
                <div className="logo">
                    <RoomIcon className="logoIcon" />
                    <span>Travist</span>
                </div>
                <form onSubmit={handleSubmit}>
                    {success && <span className="flash-message success">Successfully register. You can login now!</span>}
                    {error && <span className="flash-message failure">Something went wrong!</span>}
                    <div className="input-section">
                        <input autoFocus placeholder="Username" ref={usernameRef} />
                    </div>
                    <div className="input-section">
                        <input type="email" placeholder="Email address" ref={emailRef} />
                    </div>
                    <div className="input-section">
                        <input type="password" min="6" placeholder="Password" ref={passwordRef}/>
                    </div>
                    <button className="registerBtn" type="submit">
                        Register
                    </button>
                </form>
                <CloseIcon
                    className="registerCancel"
                    onClick={() => setShowRegister(false)}
                />
            </div>
        </div>
    );
}
