import {Header} from "../components/Header/Header";
import * as React from "react";
import {Footer} from "../components/Footer/Footer";

export default function PageLayout (props) {
    return <>
        <Header fadeMode={false}/>
        <div className="pageWrapper">
            <div className="container">
                {props.children}
            </div>
        </div>
        <Footer/>
    </>
}