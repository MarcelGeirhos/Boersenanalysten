import React from 'react';

// own module imports
import Inputfield from '../gui/inputs/Inputfield';
import Mainbutton from '../gui/buttons/Mainbutton';
import Secondbutton from '../gui/buttons/Secondbutton';

// css imports
import './Navigation.css';

// third party imports
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <header>
            <nav>
                <div className="title">
                    <Link to="/articleList">
                        <h1>Boersenanalysten</h1>
                    </Link>
                </div>
                <div className="search">
                    <Inputfield type="text" placeholder="Suchen..." />
                    <Secondbutton>Suchen</Secondbutton>
                </div>
                <div className="login-and-register">
                    <Mainbutton link="/login">Login</Mainbutton>
                    <Mainbutton link="/register">Registrieren</Mainbutton>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;