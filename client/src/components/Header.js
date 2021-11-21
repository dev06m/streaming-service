import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './/GoogleAuth'

const Header = () => {
    return (
        /*
            Error: Invariant failed: You should not use <Link> outside a <Router>
            this error message saying you should not use a link outside of a router is
            essentially saying that any component that is not a child of our router
            cannot contain any react router related components
        */
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamy
             </Link> 
            <div className="right menu">
                <Link to="/" className="item"> 
                    All Streams
                </Link>
            <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;