import React, { useState, useEffect } from 'react';

// own module imports
import Secondbutton from '../../gui/buttons/secondbutton/Secondbutton';
import firebaseConfig from '../../../firebase/Config';

// css imports
import './UserprofileNavigation.css';

function UserprofileNavigation() {
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const getUser = async () => {
                setUserState(user);
            }
            getUser();
        })
    })

    return (
        <div className="user-profile-grid navigation">
            <nav>
                <Secondbutton link={{pathname: userState != null ? `/userprofile/${userState.uid}` : ``}}>Profil</Secondbutton>
                <Secondbutton link={{pathname: userState != null ? `/portfolioHistory/${userState.uid}` : ``}}>Portfolio Historie</Secondbutton>
                <Secondbutton link={{pathname: userState != null ? `/settings/profileSettings/${userState.uid}` : ``}}>Einstellungen</Secondbutton>
            </nav>
        </div>
    );
}

export default UserprofileNavigation;