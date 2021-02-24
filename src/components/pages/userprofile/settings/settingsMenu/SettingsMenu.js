import React from 'react';
import { Link } from 'react-router-dom';

// css imports
import './SettingsMenu.css';

function SettingsMenu() {
    return (
        <div className="settings-menu">
            <ul>
                <Link to="profileSettings">
                    <li>Profil</li>
                </Link>
                <Link to="emailSettings">
                    <li>E-Mail</li>
                </Link>
                <Link to="passwordSettings">
                    <li>Passwort</li>
                </Link>
                <Link to="portfolioHistorySettings">
                    <li>Portfolio Historie</li>
                </Link>
                <Link to="deleteProfileSettings">
                    <li>Profil löschen</li>
                </Link>
            </ul>
        </div>
    );
}

export default SettingsMenu;