import React, { useState } from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';
import Secondbutton from '../../../gui/buttons/secondbutton/Secondbutton';
import { logoutUser } from '../../../../redux/actions/LogoutAction';

// css imports
import './SettingsPage.css';

// third party imports
import { useDispatch } from 'react-redux';

function SettingsPage() {
    const [setUserState] = useState(null);
    const dispatch = useDispatch();

    const logoutUserAction = () => dispatch(logoutUser());
    
    const logout = async() => {
        console.log("Benutzer wird ausgeloggt.");
        setUserState(null);
        await logoutUserAction();
        // TODO props.history.replace("/");
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <Secondbutton link="/" onClick={logout}>Logout</Secondbutton>
        </div>
    );
}

export default SettingsPage;