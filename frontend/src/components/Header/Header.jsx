import * as React from "react";
import "./Header.css";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";

export function Header({fadeMode, onAuthMenuClicked}) {
    const location = useLocation();

    const onAuthClick = (e, menu) => {
        e.preventDefault()
        onAuthMenuClicked(menu, e.target.href)
    }

    return (
        <header className={`headerWrapper${fadeMode ? ' headerFade' : ''}`}>
            <Logo/>
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
                        <NavLink to="/login" className="headerNavLink" onClick={(e) => onAuthClick(e, 'login')}>
                            Sign In <LoginIcon className="headerNavLinkIconRight"/>
                        </NavLink>
                    </li>
                    <li className="headerNavItem headerNavText">or</li>
                    <li className="headerNavItem">
                        <NavLink to="/register" className="headerNavLink headerNavLinkButton" onClick={(e) => onAuthClick(e, 'register')}>
                            Register <AccountCircleOutlinedIcon className="headerNavLinkIconRight"/>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}