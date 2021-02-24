import React from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './EmailSettingsPage.css';

function EmailSettingsPage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu />
            <h1>Email Einstellungen</h1>
        </div>
    );
}

export default EmailSettingsPage;