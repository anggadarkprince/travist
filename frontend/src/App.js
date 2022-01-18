import './App.css';
import * as React from 'react';
import {Routes, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import Nearby from "./pages/Nearby/Nearby";
import Error404 from "./pages/Error404/Error404";
import Legals from "./pages/Legals/Legals";
import {useState} from "react";

function App() {
    const [fadeMode, setFadeMode] = useState(true)

    return (
        <div>
            <Header fadeMode={fadeMode}/>
            <div className="pageWrapper">
                <Routes>
                    <Route path={'/'} element={<Explore setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/explore'} element={<Explore setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/nearby'} element={<Nearby setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/about'} element={<About setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path={'/legals/*'} element={<Legals setHeaderFade={setFadeMode.bind(this)}/>}/>
                    <Route path="*" element={<Error404 setHeaderFade={setFadeMode.bind(this)}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
