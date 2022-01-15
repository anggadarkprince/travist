import * as React from "react";
import "./Footer.css";
import {NavLink} from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";

export function Footer() {
    return (
        <footer className="footer">
            <p className="footerCopyright">
                &copy; 2022 <RoomIcon className="footerLogoIcon"/> <strong>Travist organization</strong> all rights reserved
            </p>
            <ul className="footerNav">
                <li><NavLink to="/explore" className="footerLink">Explore</NavLink></li>
                <li><NavLink to="/legals/terms" className="footerLink">Terms & Conditions</NavLink></li>
                <li><NavLink to="/legals/cookie" className="footerLink">Cookie</NavLink></li>
            </ul>
        </footer>
    )
}