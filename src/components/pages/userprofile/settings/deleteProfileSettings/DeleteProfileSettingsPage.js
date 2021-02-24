import React from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './DeleteProfileSettingsPage.css';

function DeleteProfileSettingsPage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu />
            <h1>Profil löschen Einstellungen</h1>
        </div>
    );
}

export default DeleteProfileSettingsPage;