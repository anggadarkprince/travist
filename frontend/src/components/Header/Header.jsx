import * as React from "react";
import RoomIcon from "@mui/icons-material/Room";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export function Header() {
    return (
        <header className="headerWrapper">
            <div className="headerLogo">
                <RoomIcon className="headerLogoIcon"/>
                <h1 className="headerLogoText">Travist</h1>
                <p className="headerLogoSubText">• Your simple advisor</p>
            </div>
            <nav>
                <ul className="headerNav">
                    <li className="headerNavItem"><a href="#" className="headerNavLink active"><ExploreOutlinedIcon/> Explore</a></li>
                    <li className="headerNavItem"><a href="#" className="headerNavLink"><MapOutlinedIcon/> Nearby</a></li>
                    <li className="headerNavItem"><a href="#" className="headerNavLink"><PushPinOutlinedIcon/> About</a></li>
                    <li className="headerNavItem headerNavSeparator"/>
                    <li className="headerNavItem"><a href="#" className="headerNavLink">Sign In <LoginIcon className="headerNavLinkIconRight"/></a></li>
                    <li className="headerNavItem headerNavText">or</li>
                    <li className="headerNavItem"><a href="#" className="headerNavLink headerNavLinkButton">Register <AccountCircleOutlinedIcon className="headerNavLinkIconRight"/></a></li>
                </ul>
            </nav>
        </header>
    )
}