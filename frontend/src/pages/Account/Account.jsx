import React, {useEffect, useState} from "react";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";

export default function Account() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmittingProfile, setIsSubmittingProfile] = useState(false)
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false)
    const [inputs, setInputs] = useState({})

    useEffect(async () => {
        document.title = "User account - Travist"
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        const response = await axios.get(`users/account`);
        setInputs({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
            email: response.data.email,
            contactNumber: response.data.contactNumber,
            address: response.data.address,
        })
        setIsLoading(false)
    }, [])

    const onInputChanged = (e) => {
        setInputs((prevState) => (
            {...prevState, [e.target.id]: e.target.value}
        ))
    }

    const onSubmitAccountProfile = async (e) => {
        e.preventDefault()

        try {
            setIsSubmittingProfile(true)
            await axios.put('users/update-profile', {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                username: inputs.username,
                email: inputs.email,
                contactNumber: inputs.contactNumber,
                address: inputs.address,
            })
        } catch (err) {
            console.log(err)
        } finally {
            setIsSubmittingProfile(false)
        }
    }

    return (
        <PageLayout>
            <h1 className="pageTitleLarge">My Account</h1>
            <div className="row mbLarge">
                <div className="column30">
                    <h3 className="pageTitle">Profile <ArrowForwardOutlinedIcon className="textOrange"/></h3>
                    <p className="pageSubtitle">Basic information</p>
                </div>
                <div className="column70">
                    <form onSubmit={onSubmitAccountProfile}>
                        <fieldset disabled={isSubmittingProfile || isLoading}>
                            <div className="formSection">
                                <h4 className="formSectionTitle">Basic Information</h4>
                                <div className="row">
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="firstName">First Name</label>
                                            <input placeholder="First name" id="firstName"
                                                   defaultValue={inputs?.firstName}
                                                   onChange={onInputChanged}/>
                                        </div>
                                    </div>
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input placeholder="Last name" id="lastName"
                                                   defaultValue={inputs?.lastName}
                                                   onChange={onInputChanged}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="email">Email</label>
                                            <input placeholder="Email address" id="email"
                                                   defaultValue={inputs?.email}
                                                   onChange={onInputChanged} />
                                        </div>
                                    </div>
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="username">Username</label>
                                            <input placeholder="Username" id="username"
                                                   defaultValue={inputs?.username}
                                                   onChange={onInputChanged} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="formSection">
                                <h4 className="formSectionTitle">Contact & Location</h4>
                                <div className="input-section">
                                    <label htmlFor="contactNumber">Contact Number</label>
                                    <input placeholder="Phone number" id="contactNumber"
                                           defaultValue={inputs?.contactNumber}
                                           onChange={onInputChanged} />
                                </div>
                                <div className="input-section">
                                    <label htmlFor="address">Address</label>
                                    <textarea placeholder="Your address" id="address" rows={2}
                                              defaultValue={inputs?.address}
                                              onChange={onInputChanged} />
                                </div>
                            </div>
                            {
                                isSubmittingProfile
                                    ? <button type="button" className="button buttonViolet" disabled>Profile Updating</button>
                                    : <button type="submit" className="button buttonViolet">Save Profile</button>
                            }
                        </fieldset>
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
                        <fieldset disabled={isSubmittingProfile || isLoading}>
                            <div className="formSection">
                                <h4 className="formSectionTitle">Change Password</h4>
                                <div className="input-section">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input type="password" placeholder="Your current password" id="currentPassword"
                                           defaultValue={inputs?.currentPassword}
                                           onChange={onInputChanged} />
                                </div>
                                <div className="row">
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="newPassword">New Password</label>
                                            <input type="password" placeholder="Type new password" id="newPassword"
                                                   defaultValue={inputs?.newPassword}
                                                   onChange={onInputChanged} />
                                        </div>
                                    </div>
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                            <input type="password" placeholder="Confirm new password" id="confirmNewPassword"
                                                   defaultValue={inputs?.confirmNewPassword}
                                                   onChange={onInputChanged} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="button buttonOrange">Change Password</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}