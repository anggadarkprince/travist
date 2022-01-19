import React, {useEffect} from "react";
import Constants from "../../Constants";

export default function Cookie() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <article className="container">
            <div className="legalTitleWrapper">
                <h3 className="legalTitle">Cookie</h3>
                <p className="legalSubtitle">Last updated 20 February 2022</p>
            </div>

            <p>
                This is the Cookie Policy for <strong>Travist</strong>, accessible from {Constants.baseUrl}
            </p>

            <h5 className="legalSectionTitle">What Are Cookies</h5>
            <p>
                As is common practice with almost all professional websites this site uses cookies, which are tiny files that
                are downloaded to your computer, to improve your experience. This page describes what information they gather,
                how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these
                cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
            </p>

            <p>
                For more general information on cookies, please read <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.
            </p>

            <h5 className="legalSectionTitle">How We Use Cookies</h5>
            <p>
                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry
                standard options for disabling cookies without completely disabling the functionality and features they add to
                this site. It is recommended that you leave on all cookies if you are not sure whether you need them or
                not in case they are used to provide a service that you use.
            </p>

            <h5 className="legalSectionTitle">Disabling Cookies</h5>

            <p>
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how
                to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that
                you visit. Disabling cookies will usually result in also disabling certain functionality and features of
                the this site. Therefore it is recommended that you do not disable cookies.
            </p>

            <h5 className="legalSectionTitle">The Cookies We Set</h5>
            <ul className="legalList">
                <li>
                    <h4>Account related cookies</h4>
                    <p>
                        If you create an account with us then we will use cookies for the management of the signup process and
                        general administration. These cookies will usually be deleted when you log out however in some
                        cases they may remain afterwards to remember your site preferences when logged out.
                    </p>
                </li>
                <li>
                    <h4>Login related cookies</h4>
                    <p>
                        We use cookies when you are logged in so that we can remember this fact. This prevents you from having to
                        log in every single time you visit a new page. These cookies are typically removed or cleared
                        when you log out to ensure that you can only access restricted features and areas when logged in.
                    </p>
                </li>
                <li>
                    <h4>Forms related cookies</h4>
                    <p>
                        When you submit data to through a form such as those found on contact pages or comment forms
                        cookies may be set to remember your user details for future correspondence.
                    </p>
                </li>
                <li>
                    <h4>Site preferences cookies</h4>
                    <p>
                        In order to provide you with a great experience on this site we provide the functionality to set your
                        preferences for how this site runs when you use it. In order to remember your preferences we need to set
                        cookies so that this information can be called whenever you interact with a page is affected by
                        your preferences.
                    </p>
                </li>
            </ul>

            <h5 className="legalSectionTitle">Third Party Cookies</h5>
            <p>
                In some special cases we also use cookies provided by trusted third parties. The following section
                details which third party cookies you might encounter through this site.
            </p>

            <ul className="legalList">
                <li>
                    <p>
                        This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the
                        web for helping us to understand how you use the site and ways that we can improve your experience.
                        These cookies may track things such as how long you spend on the site and the pages that you
                        visit so we can continue to produce engaging content.
                    </p>
                    <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
                </li>
                <li>
                    <p>
                        From time to time we test new features and make subtle changes to the way that the site is
                        delivered. When we are still testing new features these cookies may be used to ensure that you receive a
                        consistent experience whilst on the site whilst ensuring we understand which optimisations our users
                        appreciate the most.
                    </p>
                </li>
                <li>
                    <p>
                        As we sell products it's important for us to understand statistics about how many of the
                        visitors to our site actually make a purchase and as such this is the kind of data that these cookies will
                        track. This is important to you as it means that we can accurately make business predictions that allow us
                        to monitor our advertising and product costs to ensure the best possible price.
                    </p>
                </li>
            </ul>

            <h5 className="legalSectionTitle">More Information</h5>

            <p>
                Hopefully that has clarified things for you and as was previously mentioned if there is something that
                you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with
                one of the features you use on our site.
            </p>
        </article>
    )
}