import './App.css';
import * as React from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import Nearby from "./pages/Nearby/Nearby";
import Error404 from "./pages/Error404/Error404";
import Legals from "./pages/Legals/Legals";
import {useState} from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
    const myStorage = window.localStorage;
    const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
    const [fadeMode, setFadeMode] = useState(true)
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const onAuthMenuClicked = (menu, url) => {
        switch (menu) {
            case 'register':
                setShowRegister(true)
                setShowLogin(false)
                break;
            case 'login':
                setShowRegister(false)
                setShowLogin(true)
                break;
            default:
                setShowRegister(false)
                setShowLogin(false)
                break;
        }
    }

    const handleLogout = (e) => {
        e.preventDefault()
        setCurrentUsername(null);
        myStorage.removeItem("user");
        navigate('/explore');
    };

    return (
        <div>
            <Header fadeMode={fadeMode}
                    currentUsername={currentUsername}
                    onAuthMenuClicked={onAuthMenuClicked}
                    handleLogout={handleLogout}/>
            <div className="pageWrapper">
                <Routes>
                    <Route path={'/'} element={<Explore setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/explore'} element={<Explore setHeaderFade={setFadeMode.bind(this)} username={myStorage.getItem("user")}/>}/>
                    <Route path={'/nearby'} element={<Nearby setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/about'} element={<About setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/legals/*'} element={<Legals setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path="*" element={<Error404 setHeaderFade={setFadeMode.bind(this)}/>}/>
                </Routes>
            </div>
            <Register onAuthMenuClicked={onAuthMenuClicked} showRegister={showRegister} setShowRegister={setShowRegister} />
            <Login onAuthMenuClicked={onAuthMenuClicked} showLogin={showLogin} setShowLogin={setShowLogin} setCurrentUsername={setCurrentUsername} myStorage={myStorage} />
        </div>
    );
}

export default App;
