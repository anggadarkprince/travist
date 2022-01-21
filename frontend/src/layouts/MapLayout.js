import {Header} from "../components/Header/Header";
import * as React from "react";

export default function MapLayout (props) {
    return <>
        <Header fadeMode={true}/>
        {props.children}
    </>
}