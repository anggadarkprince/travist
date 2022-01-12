import axios from "axios";
import React, {useRef, useState} from "react";
import "./Login.css";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import Constants from "../../Constants";

export default function Login({setShowLogin, setCurrentUsername, myStorage}) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const res = await axios.post(Constants.baseUrl + "/users/login", user);
            setCurrentUsername(res.data.username);
            myStorage.setItem('user', res.data.username)
            setShowLogin(false)

            usernameRef.current.value = ''
            passwordRef.current.value = ''
        } catch (err) {
            setError(true)
        }
    };

    return (
        <div className="loginOverlay">
            <div className="loginContainer">
                <div className="logo">
                    <RoomIcon className="logoIcon"/>
                    <span>Travist</span>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <span className="flash-message failure">Something went wrong!</span>}
                    <div className="input-section">
                        <input autoFocus placeholder="Username" ref={usernameRef}/>
                    </div>
                    <div className="input-section">
                        <input type="password" min="6" placeholder="Password" ref={passwordRef}/>
                    </div>
                    <button className="loginBtn" type="submit">
                        Login
                    </button>
                </form>
                <CloseIcon
                    className="loginCancel"
                    onClick={() => setShowLogin(false)}
                />
            </div>
        </div>
    );
}