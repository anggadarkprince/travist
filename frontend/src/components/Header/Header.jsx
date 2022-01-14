import * as React from "react";
import "./Header.css";
import RoomIcon from "@mui/icons-material/Room";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router-dom";

export function Header() {
    const location = useLocation();

    return (
        <header className="headerWrapper">
            <div className="headerLogo">
                <RoomIcon className="headerLogoIcon"/>
                <h1 className="headerLogoText">Travist</h1>
                <p className="headerLogoSubText">• Your simple advisor</p>
            </div>
            <nav>
                <ul className="headerNav">
                    <li className="headerNavItem">
                        <NavLink to="/explore" className={isActive =>
                            "headerNavLink" + (['/', '/explore'].includes(location.pathname) ? " active" : "")
                        }>
                            <ExploreOutlinedIcon/> Explore
                        </NavLink>
                    </li>
                    <li className="headerNavItem">
                        <NavLink to="/nearby" className="headerNavLink">
                            <MapOutlinedIcon/> Nearby
                        </NavLink>
                    </li>
                    <li className="headerNavItem">
                        <NavLink to="/about" className="headerNavLink">
                            <PushPinOutlinedIcon/> About
                        </NavLink>
                    </li>
                    <li className="headerNavItem headerNavSeparator"/>
                    <li className="headerNavItem">
                        <NavLink to="/login" className="headerNavLink">
                            Sign In <LoginIcon className="headerNavLinkIconRight"/>
                        </NavLink>
                    </li>
                    <li className="headerNavItem headerNavText">or</li>
                    <li className="headerNavItem">
                        <NavLink to="/register" className="headerNavLink headerNavLinkButton">
                            Register <AccountCircleOutlinedIcon className="headerNavLinkIconRight"/>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}