import * as React from "react";
import "./Header.css";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";
import {Dropdown} from "../Dropdown/Dropdown";
import {useContext} from "react";
import AuthContext from "../../AuthContext";

export function Header({fadeMode, setShowLogin, setShowRegister, handleLogout}) {
    const location = useLocation();
    const auth = useContext(AuthContext);

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
                    {
                        auth.user
                            ? <>
                                <li className="headerNavItem">
                                    <Dropdown menuRight={true} label={auth.user.username} icon={<AccountCircleOutlinedIcon className="headerNavLinkIconRight"/>}>
                                        <div><NavLink className="dropdownItem" to="/my-pins"><EditLocationOutlinedIcon/> My Pins</NavLink></div>
                                        <div><NavLink className="dropdownItem" to="/account"><AccountCircleOutlinedIcon/> Edit Account</NavLink></div>
                                        <div><hr className="dropdownDivider"/></div>
                                        <div><NavLink to="/logout" className="dropdownItem" onClick={handleLogout}><LogoutIcon/> Sign Out</NavLink></div>
                                    </Dropdown>
                                </li>
                            </>
                            : <>
                                <li className="headerNavItem">
                                    <NavLink to="/login" className="headerNavLink" onClick={(e) => {
                                        e.preventDefault()
                                        setShowLogin(true)
                                        setShowRegister(false)
                                    }}>
                                        Sign In <LoginIcon className="headerNavLinkIconRight"/>
                                    </NavLink>
                                </li>
                                <li className="headerNavItem headerNavText">or</li>
                                <li className="headerNavItem">
                                    <NavLink to="/register" className="headerNavLink headerNavLinkButton" onClick={(e) => {
                                        e.preventDefault()
                                        setShowLogin(false)
                                        setShowRegister(true)
                                    }}>
                                        Register <AccountCircleOutlinedIcon className="headerNavLinkIconRight"/>
                                    </NavLink>
                                </li>
                            </>
                    }

                </ul>
            </nav>
        </header>
    )
}