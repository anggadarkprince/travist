import './App.css';
import * as React from 'react';
import {Routes, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import Nearby from "./pages/Nearby/Nearby";
import Error404 from "./pages/Error404/Error404";
import Legals from "./pages/Legals/Legals";

function App() {
    return (
        <div>
            <Header/>
            <div className="pageWrapper">
                <Routes>
                    <Route path={'/'} element={<Explore/>}/>
                    <Route path={'/explore'} element={<Explore/>}/>
                    <Route path={'/nearby'} element={<Nearby/>}/>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={'/legals/*'} element={<Legals/>}/>
                    <Route path="*" element={<Error404/>}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
