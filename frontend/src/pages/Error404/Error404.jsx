import React, {useEffect} from "react";
import "./Error404.css";
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import {Link} from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";

export default function Error404() {

    useEffect(() => {
        document.title = "Page not found - Travist"
    }, [])

    return (
        <PageLayout>
            <div className="errorPage">
                <WrongLocationOutlinedIcon className="errorIcon"/>
                <h1 className="errorCode">404</h1>
                <h4 className="errorTitle">Page not found</h4>
                <p className="errorSubTitle">
                    The page you are looking for might have been removed<br/>
                    had its name changed or is temporary unavailable
                </p>
                <Link to="/" className="errorButton">GO TO HOMEPAGE</Link>
            </div>
        </PageLayout>
    )
}