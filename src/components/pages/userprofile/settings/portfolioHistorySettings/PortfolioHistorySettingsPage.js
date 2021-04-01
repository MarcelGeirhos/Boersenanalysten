import React from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './PortfolioHistorySettingsPage.css';

function PortfolioHistorySettingsPage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={2}/>
            <SettingsMenu />
            <div className="portfolio-history-settings-form">
                <h1>Portfolio Historie Einstellungen</h1>
            </div>
        </div>
    );
}

export default PortfolioHistorySettingsPage;