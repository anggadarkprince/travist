import React from "react";
import "./About.css";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import Logo from "../../components/Logo/Logo";
import {Footer} from "../../components/Footer/Footer";

export default function Explore() {
    return (
        <div className="pageContainer">
            <div className="aboutPage">
                <div className="aboutMainTitleWrapper">
                    <DirectionsOutlinedIcon className="aboutIcon"/>
                    <h1 className="aboutMainTitle">Explore and navigate your world</h1>
                    <p>Travis is your simply trip advisor and reviews</p>
                </div>

                <div className="aboutColumns">
                    <div className="aboutSection aboutColumn30">
                        <h3 className="aboutSectionTitle">Discover new experiences across the world or around the corner</h3>
                        <ul className="aboutSectionList">
                            <li className="aboutSectionListItem active">
                                <h4 className="aboutSectionCardTitle">Explore your world</h4>
                                <p className="aboutSectionCardDescription">With the redesigned Explore tab, find places to eat and things to do around you or when you travel</p>
                            </li>
                            <li className="aboutSectionListItem">
                                <h4 className="aboutSectionCardTitle">See places you match with</h4>
                                <p className="aboutSectionCardDescription">The Your Match score shows you how well a place matches your tastes and preferences</p>
                            </li>
                            <li className="aboutSectionListItem">
                                <h4 className="aboutSectionCardTitle">Just for you</h4>
                                <p className="aboutSectionCardDescription">See recommendations for new and trending places based on your interests</p>
                            </li>
                            <li className="aboutSectionListItem">
                                <h4 className="aboutSectionCardTitle">Create pins</h4>
                                <p className="aboutSectionCardDescription">
                                    Easily create lists of places you want to go, and add notes to the places you’ve saved.
                                    You can keep these lists private, share them with close friends, or share them publicly.
                                    You can also browse through lists created by publishers
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="aboutColumn70" style={{alignItems: "end", justifyContent: "center"}}>
                        <img src="https://wallpapercave.com/wp/wp1933849.jpg" className="aboutCardBanner" style={{width: "80%"}} alt="People"/>
                    </div>
                </div>

                <div className="aboutColumns">
                    <div className="aboutColumn70">
                        <img src="https://img.wallpapersafari.com/desktop/800/450/28/26/h9nKwN.jpg" className="aboutCardBanner" style={{width: "80%"}} alt="People"/>
                    </div>
                    <div className="aboutSection aboutColumn30">
                        <h3 className="aboutSectionTitle">Make your plans happen by connecting with the places you’re interested in</h3>
                        <ul className="aboutSectionList">
                            <li className="aboutSectionListItem active">
                                <h4 className="aboutSectionCardTitle">Follow your favorites</h4>
                                <p className="aboutSectionCardDescription">Stay on top of offers, updates and more when you follow your favorite businesses</p>
                            </li>
                            <li className="aboutSectionListItem">
                                <h4 className="aboutSectionCardTitle">Explore your friend pins</h4>
                                <p className="aboutSectionCardDescription">See the way you need to go with arrows and directions placed right on top of your world</p>
                            </li>
                            <li className="aboutSectionListItem">
                                <h4 className="aboutSectionCardTitle">Get information about location</h4>
                                <p className="aboutSectionCardDescription">Message a business right on Google Maps to find out information</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="aboutClosingTitleWrapper">
                    <div className="aboutClosingLogoWrapper">
                        <Logo/>
                    </div>
                    <h3 className="aboutClosingTitle">
                        See how people are using Travist to explore what’s around them,<br/>
                        put their communities on the map, and help others
                    </h3>
                    <p className="aboutClosingSubTitle">
                        Map making is an ancient human endeavor, and one that those of us working on Travist<br/>
                        are honored to continue to pursue.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}