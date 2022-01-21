import React from "react";
import {Route, Routes} from "react-router-dom";
import Cookie from "./Cookie";
import Terms from "./Terms";
import "./Legals.css"
import PageLayout from "../../layouts/PageLayout";

export default function Legals() {
    return <>
        <PageLayout>
            <Routes>
                <Route path={'terms'} element={<Terms/>} />
                <Route path={'cookie'} element={<Cookie/>} />
            </Routes>
        </PageLayout>
    </>
}