import React from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './PortfolioHistorySettingsPage.css';

function PortfolioHistorySettingsPage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu />
            <h1>Portfolio Historie Einstellungen</h1>
        </div>
    );
}

export default PortfolioHistorySettingsPage;