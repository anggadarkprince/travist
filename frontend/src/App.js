import './App.css';
import * as React from 'react';
import {useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import Nearby from "./pages/Nearby/Nearby";
import Error404 from "./pages/Error404/Error404";
import Legals from "./pages/Legals/Legals";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Account from "./pages/Account/Account";
import AuthContext, {authDefaultValue} from "./AuthContext";
import axios from "axios"

function App() {
    const tokenItemKey = 'appToken';
    const appStorage = window.localStorage;

    const [fadeMode, setFadeMode] = useState(true)
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault()
        axios.post("/auth/logout")
            .then(result => {
                setAuthData(authDefaultValue)
                appStorage.removeItem('user');
                appStorage.removeItem(tokenItemKey);
                navigate('/explore');
            })
            .catch(console.log);
    };

    const getAuthToken = () => {
        const apiToken = appStorage.getItem(tokenItemKey);
        return apiToken ? JSON.parse(apiToken) : null;
    }
    const apiTokenData = getAuthToken();
    const [auth, setAuth] = useState(apiTokenData ? {...apiTokenData} : authDefaultValue)

    const initAuthInterceptor = () => {
        const apiTokenData = getAuthToken();
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.interceptors.response.use(response => response, error => {
            const codeUnauthenticated = (error.response?.status || 500) === 401
            const statusIsExpired = (error.response?.data?.status || '') === 'expired'
            if (codeUnauthenticated || statusIsExpired) {
                // access token is expired, try get new access token by passing refresh token
                if (statusIsExpired) {
                    console.log('Access token is expired')

                    // optional added in body request (already live in http only cookie)
                    const originalRequest = error.config;
                    return axios.post("auth/refresh-token", {refreshToken: apiTokenData.refreshToken})
                        .then(response => response.data)
                        .then(data => {
                            apiTokenData.accessToken = data.accessToken;
                            apiTokenData.refreshToken = data.refreshToken;
                            appStorage.setItem(tokenItemKey, JSON.stringify(apiTokenData));
                            return axios(originalRequest);
                        });
                } else {
                    console.log('Unauthorized or refresh token expired')
                    localStorage.removeItem(tokenItemKey)
                    setShowLogin(true)
                }
            } else {
                return Promise.reject(error);
            }
        });
    }
    initAuthInterceptor()

    const setAuthData = (data, callback = () => {}) => {
        appStorage.setItem(tokenItemKey, JSON.stringify(data))
        setAuth(data)
        callback()
    }

    return (
        <AuthContext.Provider value={auth}>
            <Header fadeMode={fadeMode}
                    setShowRegister={setShowRegister}
                    setShowLogin={setShowLogin}
                    handleLogout={handleLogout}/>
            <div className="pageWrapper">
                <Routes>
                    <Route path={'/'} element={<Explore setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/explore'} element={<Explore setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/nearby'} element={<Nearby setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/about'} element={<About setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/legals/*'} element={<Legals setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/account'} element={<Account setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path="*" element={<Error404 setHeaderFade={setFadeMode.bind(this)}/>}/>
                </Routes>
            </div>
            <Register showRegister={showRegister}
                      setShowRegister={setShowRegister}
                      setShowLogin={setShowLogin}/>
            <Login showLogin={showLogin}
                   setShowRegister={setShowRegister}
                   setShowLogin={setShowLogin}
                   setAuthData={setAuthData}/>
        </AuthContext.Provider>
    );
}

export default App;
