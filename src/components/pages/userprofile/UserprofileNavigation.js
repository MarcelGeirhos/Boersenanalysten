import React, { useState, useEffect } from 'react';

// own module imports
import Secondbutton from '../../gui/buttons/secondbutton/Secondbutton';
import firebaseConfig from '../../../firebase/Config';

// css imports
import './UserprofileNavigation.css';

// third party imports
import firebase from 'firebase/app';

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
                {/* TODO hier weitermachen */}
                {/* <Secondbutton link={{pathname: `/userprofile/${userState.uid}`}}>Profil</Secondbutton>*/}
                <Secondbutton link="/userprofile">Profil</Secondbutton>
                <Secondbutton link="/portfolioHistory/">Portfolio Historie</Secondbutton>
                <Secondbutton link="/settings/profileSettings">Einstellungen</Secondbutton>
            </nav>
        </div>
    );
}

export default UserprofileNavigation;