import RoomIcon from "@mui/icons-material/Room";
import * as React from "react";

export default function Logo() {
    return (
        <div className="headerLogo">
            <RoomIcon className="headerLogoIcon"/>
            <h1 className="headerLogoText">Travist</h1>
            <p className="headerLogoSubText">• Your simple advisor</p>
        </div>
    )
}