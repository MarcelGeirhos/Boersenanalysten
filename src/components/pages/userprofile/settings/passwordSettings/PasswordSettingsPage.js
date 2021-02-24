import React from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './PasswordSettingsPage.css';

function PasswordSettingsPage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu />
            <h1>Passwort Einstellungen</h1>
        </div>
    );
}

export default PasswordSettingsPage;