import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFinance } from '@mdi/js';
import './Navbar.css';

const Navbar = () => {
            
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <Icon path={mdiFinance}
                        size={2}
                        horizontal
                        vertical
                        rotate={180}
                        color="white"
                    /> 
                </Link>
                Stock Watch
            </h1>
            <Fragment>
                <ul>
                    <li><Link to="/nyse">NYSE</Link></li>
                    <li><Link to="/nasdaq">NASDAQ</Link></li>
                    <li><Link to="/portfolio">PORTFOLIO</Link></li>
                </ul>
            </Fragment>
        </nav>
    )
};


export default Navbar;