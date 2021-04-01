import React, { useState, useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../firebase/Config';

// css imports
import './UserprofileNavigation.css';

// third party imports
import { Link } from 'react-router-dom';

// material-ui imports
import {
    Tabs,
    Tab,
} from '@material-ui/core';

function UserprofileNavigation({ selectedTab }) {
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
            <Tabs value={selectedTab} textColor="white">
                <Tab to={{pathname: userState != null ? `/userprofile/${userState.uid}` : ``}} label="Profil" component={Link} value={0} />
                <Tab to={{pathname: userState != null ? `/portfolioHistory/${userState.uid}` : ``}} label="Portfolio Historie" component={Link} value={1} />
                <Tab to={{pathname: userState != null ? `/settings/profileSettings/${userState.uid}` : ``}} label="Einstellungen" component={Link} value={2} />
            </Tabs>   
        </div>
    );
}

export default UserprofileNavigation;
