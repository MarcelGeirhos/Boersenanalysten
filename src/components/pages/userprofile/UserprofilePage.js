import React from 'react';

// css imports
import './UserprofilePage.css';

function UserprofilePage() {
    return (
        <div className="user-profile-grid-container">
            <div className="user-profile-grid navigation">
                <nav>
                    <ul>
                        <li>Profil</li>
                        <li>Profil editieren</li>
                        <li>Einstellungen</li>
                    </ul>
                </nav>
            </div>
            <div className="user-profile-grid overview">
                Item 2
            </div>
            <div className="user-profile-grid stats">
                Item 3
            </div>
            <div className="user-profile-grid top-tags">
                Item 4
            </div>
            <div className="user-profile-grid article-list">
                Item 5
            </div>
        </div>
    );
}

export default UserprofilePage;