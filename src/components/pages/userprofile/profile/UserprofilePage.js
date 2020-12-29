import React from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';

// css imports
import './UserprofilePage.css';

function UserprofilePage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
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