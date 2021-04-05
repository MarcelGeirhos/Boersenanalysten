import React from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';

// css imports
import './UserActivityPage.css';

function UserActivityPage() {
    

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={1} />
            <div className="user-activity-page">
                <h2>Aktivität</h2>
            </div>
        </div>
    );
}

export default UserActivityPage;