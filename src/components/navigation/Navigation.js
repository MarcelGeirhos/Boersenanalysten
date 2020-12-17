import React from 'react';

import { Link } from 'react-router-dom'

// css imports
import './Navigation.css';
import '../gui/inputs/Inputfield.css';
import '../gui/buttons/Mainbutton.css';
import '../gui/buttons/Secondbutton.css';

function Navigation() {
    return (
        <header>
            <nav>
                <div className="title">
                    <h1>Boersenanalysten</h1>
                </div>
                <div className="search">
                    <input type="text" className="inputfield" placeholder="Suchen..." />
                    <button className="second-button">Suchen</button>
                </div>
                <div className="login-and-register">
                    <Link to="/login">
                        <button className="main-button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="main-button">Registrieren</button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;