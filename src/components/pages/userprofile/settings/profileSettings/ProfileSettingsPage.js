import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';
import TextEditor from '../../../../gui/inputs/textEditor/TextEditor';

// css imports
import './ProfileSettingsPage.css';

// third party imports
import firebase from 'firebase/app';

// material-ui imports
import {
    TextField,
} from '@material-ui/core';

function ProfileSettingsPage() {
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState("");
    const [domicile, setDomicile] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState("");

    // Verbindung zur SettingsMenu Komponente um auf die Benutzerdaten 
    // Zugriff zu bekommen.
    const callbackUserData = (userData) => {
        setUserData(userData);
        setUsername(userData.username);
        setDomicile(userData.domicile);
    }

    const update = async (e) => {
        e.preventDefault();
        let isUsernameValid = checkUsername();
        if (isUsernameValid) {
            await updateProfile();
        }
    }

    const updateProfile = async () => {
        await firebase.firestore().collection('users').doc(userData.uid).update({
            username: username,
            domicile: domicile,
            aboutMe: "",    // TODO
        })
        .catch(error => {
            console.log(error);
            return null;
        })
        window.location.reload();
        console.log('Benutzerprofil wurde erfolgreich aktualisiert.');
    }

    const checkUsername = () => {
        if (username === "") {
            setUsernameErrorText('Bitte geben Sie einen Benutzername ein.');
            setUsernameError(true);
            return false;
        } else if (username.length < 5) {
            setUsernameErrorText('Der Benutzername muss mindestens 5 Zeichen lang sein.');
            setUsernameError(true);
            return false;
        }
        setUsernameErrorText('');
        setUsernameError(false);
        return true;
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu parentCallbackUserData={callbackUserData} />
            <div className="profile-settings-form">
                <form onSubmit={update}>
                    <TextField
                        label="Benutzername"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="filled"
                        className="register-text-field"
                        focused
                        error={usernameError}
                        helperText={usernameErrorText}
                        inputProps={{ style: { color: 'white'}}}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }} />
                        <br />
                    <TextField
                        label="Wohnort"
                        type="text"
                        value={domicile}
                        onChange={(e) => setDomicile(e.target.value)}
                        variant="filled"
                        className="register-text-field"
                        focused
                        inputProps={{ style: { color: 'white'}}}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }} />
                    <TextEditor title="Über mich:" />
                    <input type="submit" value="Profil Speichern" id="save-profile-button" className="main-button" />
                </form>
            </div>
        </div>
    );
}

export default ProfileSettingsPage;