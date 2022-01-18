import React from "react";
import {Route, Routes} from "react-router-dom";
import {Footer} from "../../components/Footer/Footer";
import Cookie from "./Cookie";
import Terms from "./Terms";
import "./Legals.css"

export default function Legals() {

    return (
        <div className="pageContainer">
            <Routes>
                <Route path={'cookie'} element={<Cookie/>} />
                <Route path={'terms'} element={<Terms/>} />
            </Routes>
            <Footer/>
        </div>
    )
}