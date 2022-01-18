import React from "react";
import {Route, Routes} from "react-router-dom";
import {Footer} from "../../components/Footer/Footer";
import Cookie from "./Cookie";
import Terms from "./Terms";
import "./Legals.css"

export default function Legals(props) {
    props.setHeaderFade(false)
    return (
        <div className="pageContainer">
            <Routes>
                <Route path={'terms'} element={<Terms/>} />
                <Route path={'cookie'} element={<Cookie/>} />
            </Routes>
            <Footer/>
        </div>
    )
}