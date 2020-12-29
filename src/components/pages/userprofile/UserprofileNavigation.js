import React from 'react';

// css imports
import './UserprofileNavigation.css';

// third party imports
import { Link } from 'react-router-dom';

function UserprofileNavigation() {
    return (
        <div className="user-profile-grid navigation">
            <nav>
                <ul>
                    <Link to="/userprofile">
                        <li>Profil</li>
                    </Link>
                    <Link to="/editinguserprofile">
                        <li>Profil editieren</li>
                    </Link>
                    <Link to="/settings">
                        <li>Einstellungen</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default UserprofileNavigation;