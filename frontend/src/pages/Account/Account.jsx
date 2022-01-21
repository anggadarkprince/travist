import React, {useEffect} from "react";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import PageLayout from "../../layouts/PageLayout";

export default function Account() {

    useEffect(() => {
        document.title = "User account - Travist"
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <PageLayout>
            <h1 className="pageTitleLarge">My Account</h1>
            <div className="row mbLarge">
                <div className="column30">
                    <h3 className="pageTitle">Profile <ArrowForwardOutlinedIcon className="textOrange"/></h3>
                    <p className="pageSubtitle">Basic information</p>
                </div>
                <div className="column70">
                    <form action="#">
                        <div className="formSection">
                            <h4 className="formSectionTitle">Basic Information</h4>
                            <div className="row">
                                <div className="column50">
                                    <div className="input-section">
                                        <label htmlFor="firstName">First Name</label>
                                        <input placeholder="First name" id="firstName" />
                                    </div>
                                </div>
                                <div className="column50">
                                    <div className="input-section">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input placeholder="First name" id="lastName" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column50">
                                    <div className="input-section">
                                        <label htmlFor="email">Email</label>
                                        <input placeholder="Email address" id="email" />
                                    </div>
                                </div>
                                <div className="column50">
                                    <div className="input-section">
                                        <label htmlFor="username">Username</label>
                                        <input placeholder="Username" id="username" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="formSection">
                            <h4 className="formSectionTitle">Contact & Location</h4>
                            <div className="input-section">
                                <label htmlFor="contact">Contact Number</label>
                                <input placeholder="Phone number" id="contact" />
                            </div>
                            <div className="input-section">
                                <label htmlFor="address">Address</label>
                                <textarea placeholder="Your address" id="address" rows={2} />
                            </div>
                        </div>

                        <button type="submit" className="button buttonViolet">Save Profile</button>
                    </form>
                </div>
            </div>
            <div className="row mbLarge">
                <div className="column30">
                    <h3 className="pageTitle">Password <ArrowForwardOutlinedIcon className="textOrange"/></h3>
                    <p className="pageSubtitle">Change your password</p>
                </div>
                <div className="column70">
                    <form action="#">
                        <div className="formSection">
                            <h4 className="formSectionTitle">Change Password</h4>
                            <div className="input-section">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input type="password" placeholder="Your current password" id="currentPassword" />
                            </div>
                            <div className="row">
                                <div className="column50">
                                    <div className="input-section">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type="password" placeholder="Type new password" id="newPassword" />
                                    </div>
                                </div>
                                <div className="column50">
                                    <div className="input-section">
                                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                        <input type="password" placeholder="Confirm new password" id="confirmNewPassword" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="button buttonOrange">Change Password</button>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}