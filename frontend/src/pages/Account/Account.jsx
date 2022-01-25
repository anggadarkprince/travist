import React, {useEffect, useState} from "react";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import {InputValidation} from "../../components/InputValidation/InputValidation";

export default function Account() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmittingProfile, setIsSubmittingProfile] = useState(false)
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false)
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        contactNumber: '',
        address: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        document.title = "User account - Travist"
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        async function fetchData() {
            const response = await axios.get(`users/account`);
            setInputs({
                ...inputs,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.username,
                email: response.data.email,
                contactNumber: response.data.contactNumber,
                address: response.data.address,
            })
            setIsLoading(false)
        }
        fetchData()
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

    const onSubmitChangePassword = async (e) => {
        e.preventDefault()

        try {
            setValidationError({})
            setIsSubmittingPassword(true)
            await axios.put('users/change-password', {
                currentPassword: inputs.currentPassword,
                newPassword: inputs.newPassword,
                confirmNewPassword: inputs.confirmNewPassword,
            })
            setInputs({
                ...inputs,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            })
        } catch (err) {
            if (err.response.status === 422) {
                setValidationError(err.response.data)
            }
        } finally {
            setIsSubmittingPassword(false)
        }
    }

    return (
        <PageLayout>
            <h1 className="pageTitleLarge">My Account</h1>
            <div className="row mbExtraLarge">
                <div className="column30">
                    <h3 className="pageTitle"><AccountCircleOutlinedIcon className="mrTiny"/> Profile</h3>
                    <p className="pageSubtitle" style={{marginLeft: '30px'}}>Basic information</p>
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
                                                   value={inputs?.firstName}
                                                   onChange={onInputChanged}/>
                                        </div>
                                    </div>
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input placeholder="Last name" id="lastName"
                                                   value={inputs?.lastName}
                                                   onChange={onInputChanged}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="email">Email</label>
                                            <input placeholder="Email address" id="email"
                                                   value={inputs?.email}
                                                   onChange={onInputChanged} />
                                        </div>
                                    </div>
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="username">Username</label>
                                            <input placeholder="Username" id="username"
                                                   value={inputs?.username}
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
                                           value={inputs?.contactNumber}
                                           onChange={onInputChanged} />
                                </div>
                                <div className="input-section">
                                    <label htmlFor="address">Address</label>
                                    <textarea placeholder="Your address" id="address" rows={2}
                                              value={inputs?.address}
                                              onChange={onInputChanged} />
                                </div>
                            </div>
                            {
                                isSubmittingProfile
                                    ? <button type="button" className="button buttonViolet" disabled><RefreshIcon className="loadingIcon rotating mrTiny"/> Profile Updating</button>
                                    : <button type="submit" className="button buttonViolet"> Save Profile</button>
                            }
                        </fieldset>
                    </form>
                </div>
            </div>
            <div className="row mbLarge">
                <div className="column30">
                    <h3 className="pageTitle"><LockOutlinedIcon className="mrTiny"/> Password</h3>
                    <p className="pageSubtitle" style={{marginLeft: '30px'}}>Change your password</p>
                </div>
                <div className="column70">
                    <form onSubmit={onSubmitChangePassword}>
                        <fieldset disabled={isSubmittingPassword || isLoading}>
                            <div className="formSection">
                                <h4 className="formSectionTitle">Change Password</h4>
                                <div className="input-section">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input type="password" placeholder="Your current password" id="currentPassword" required={true}
                                           onChange={onInputChanged} value={inputs?.currentPassword} />
                                    <InputValidation inputName="password" errorMessages={validationError.currentPassword}/>
                                </div>
                                <div className="row">
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="newPassword">New Password</label>
                                            <input type="password" placeholder="Type new password" id="newPassword"
                                                   onChange={onInputChanged} value={inputs?.newPassword} />
                                            <InputValidation inputName="newPassword" errorMessages={validationError.newPassword}/>
                                        </div>
                                    </div>
                                    <div className="column50">
                                        <div className="input-section">
                                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                            <input type="password" placeholder="Confirm new password" id="confirmNewPassword"
                                                   onChange={onInputChanged} value={inputs?.confirmNewPassword} />
                                            <InputValidation inputName="confirmNewPassword" errorMessages={validationError.confirmNewPassword}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isSubmittingPassword
                                    ? <button type="button" className="button buttonOrange" disabled><RefreshIcon className="loadingIcon rotating mrTiny"/> Password Updating</button>
                                    : <button type="submit" className="button buttonOrange"> Change Password</button>
                            }
                        </fieldset>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}