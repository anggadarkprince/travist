import './App.css';
import * as React from 'react';
import {useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
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

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault()
        axios.post("/auth/logout")
            .then(() => {
                setAuthData(authDefaultValue)
                appStorage.removeItem(tokenItemKey);
                navigate('/explore');
            })
            .catch(console.log);
    };

    const getAuthData = () => {
        const apiTokenValue = appStorage.getItem(tokenItemKey);
        const authData = apiTokenValue ? JSON.parse(apiTokenValue) : {};
        return {
            ...authDefaultValue,
            ...authData,
            setShowRegister: setShowRegister,
            setShowLogin: setShowLogin,
            handleLogout: handleLogout,
        }
    }
    const [auth, setAuth] = useState(getAuthData())

    const initAuthInterceptor = () => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.interceptors.response.use(response => response, error => {
            const codeUnauthenticated = (error.response?.status || 500) === 401
            const statusIsExpired = (error.response?.data?.status || '') === 'expired'
            if (codeUnauthenticated) {
                // access token is expired, try get new access token by passing refresh token
                if (statusIsExpired) {
                    console.log('Access token is expired')

                    // optional added in body request (already live in http only cookie)
                    const authData = getAuthData();
                    const originalRequest = error.config;
                    return axios.post("auth/refresh-token", {refreshToken: authData.refreshToken})
                        .then(response => response.data)
                        .then(data => {
                            setAuthData({
                                user: data.user,
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken,
                            })
                            return axios(originalRequest);
                        });
                } else {
                    console.log('Unauthorized or refresh token expired')
                    appStorage.removeItem(tokenItemKey);
                    setShowLogin(true)
                    setShowRegister(false)
                    return Promise.reject(error);
                }
            } else {
                return Promise.reject(error);
            }
        });
    }
    initAuthInterceptor()

    const setAuthData = (data, callback) => {
        appStorage.setItem(tokenItemKey, JSON.stringify(data))
        setAuth(prevState => (
            {...prevState, ...data}
        ))
        if (callback) {
            callback()
        } else {
            navigate('/')
        }
    }

    return (
        <AuthContext.Provider value={auth}>
            <Routes>
                <Route path={'/'} element={<Explore/>}/>
                <Route path={'/explore'} element={<Explore/>}/>
                <Route path={'/nearby'} element={<Nearby/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/legals/*'} element={<Legals/>}/>
                <Route path={'/account'} element={<Account/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
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
