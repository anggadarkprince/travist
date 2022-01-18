import React from "react";
import "./About.css";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import Logo from "../../components/Logo/Logo";
import {Footer} from "../../components/Footer/Footer";
import CollapseSection from "../../components/CollapseSection/CollapseSection";

export default function About(props) {
    props.setHeaderFade(false)

    const discoverLists = [
        {
            title: "Explore your world",
            content: "With the redesigned Explore tab, find places to eat and things to do around you or when you travel"
        },
        {
            title: "See places you match with",
            content: "The Your Match score shows you how well a place matches your tastes and preferences",
        },
        {
            title: "Just for you",
            content: "See recommendations for new and trending places based on your interests",
        },
        {
            title: "Create pins",
            content: "Easily create lists of places you want to go. You can keep these lists private, or share them with friends. You can also browse through lists created by publishers",
        },
    ];

    const connectionLists = [
        {
            title: "Follow your favorites",
            content: "Stay on top of offers, updates and more when you follow your favorite businesses",
        },
        {
            title: "Explore your friend pins",
            content: "See the way you need to go with arrows and directions placed right on top of your world",
        },
        {
            title: "Get information about location",
            content: "Message a business right on Google Maps to find out information",
        },
        {
            title: "Explore new places confidently",
            content: "See the way you need to go with arrows and directions placed right on top of your world. There’s less second guessing and missing turns",
        },
    ]

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
                        <CollapseSection lists={discoverLists} initialActive={0} interval={5}/>
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
                        <CollapseSection lists={connectionLists} initialActive={0} interval={3}/>
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