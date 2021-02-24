import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';
import Secondbutton from '../../../../gui/buttons/secondbutton/Secondbutton';

// css imports
import './ProfileSettingsPage.css';

// third party imports
import { useDispatch } from 'react-redux';

function ProfileSettingsPage() {
    {/*const [userState, setUserState] = useState(null);
    const dispatch = useDispatch();

    const logoutUserAction = () => dispatch(logoutUser());
    
    const logout = async() => {
        console.log("Benutzer wird ausgeloggt.");
        setUserState(null);
        await logoutUserAction();
        // TODO props.history.replace("/");
    }*/}

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu />
            <h1>Profil Einstellungen</h1>
            {/*<Secondbutton link="/" onClick={logout}>Logout</Secondbutton>*/}
        </div>
    );
}

export default ProfileSettingsPage;