import React from 'react';

// own module imports
import Secondbutton from '../../gui/buttons/Secondbutton';

// css imports
import './UserprofileNavigation.css';

function UserprofileNavigation() {
    return (
        <div className="user-profile-grid navigation">
            <nav>
                <Secondbutton link="/userprofile">Profil</Secondbutton>
                <Secondbutton link="/editinguserprofile">Profil editieren</Secondbutton>
                <Secondbutton link="/settings">Einstellungen</Secondbutton>
            </nav>
        </div>
    );
}

export default UserprofileNavigation;