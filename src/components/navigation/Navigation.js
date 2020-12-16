import React from 'react';

import './Navigation.css';
import '../gui/buttons/Mainbutton.css';

function Navigation() {
    return (
        <header>
            <nav>
                <div className="title">
                    <h1>Boersenanalysten</h1>
                </div>
                <div className="search">
                    <input type="text" />
                    <button>Suchen</button>
                </div>
                <div className="loginAndRegister">
                    <button className="mainButton">Login</button>
                    <button className="mainButton">Registrieren</button>
                </div>  
            </nav>
        </header>
    );
}

export default Navigation;