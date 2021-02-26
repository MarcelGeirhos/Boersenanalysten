import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';
import ErrorText from '../../../../gui/outputs/errorText/ErrorText';
import TextEditor from '../../../../gui/inputs/textEditor/TextEditor';
import InputfieldDark from '../../../../gui/inputs/inputfieldDark/InputfieldDark';

// css imports
import './ProfileSettingsPage.css';

// third party imports
import firebase from 'firebase/app';

function ProfileSettingsPage() {
    const [username, setUsername] = useState("");
    const [domicile, setDomicile] = useState("");
    const [usernameErrorText, setUsernameErrorText] = useState("Error Text");

    const update = async () => {
        let isUsernameValid = checkUsername();
        if (isUsernameValid) {
            await updateProfile();
        }
    }

    const updateProfile = async () => {
        await firebase.fir
    }

    const checkUsername = () => {
        if (username === "") {
            setUsernameErrorText('Bitte geben Sie einen Benutzername ein.');
            document.getElementById("username-error-text").style.visibility = "visible";
            return false;
        } else if (username.length < 5) {
            setUsernameErrorText('Der Benutzername muss mindestens 5 Zeichen lang sein.');
            document.getElementById("username-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("username-error-text").style.visibility = "hidden";
        return true;
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu />
            <div className="profile-settings-form">
                <form onSubmit={update}>
                    <label>Benutzername:</label>
                    <InputfieldDark type="text" placeholder="Benutzername..." onChange={(e) => setUsername(e.target.value)} />
                    <ErrorText id="username-error-text">{usernameErrorText}</ErrorText>
                    <label>Wohnort:</label>
                    <InputfieldDark type="text" placeholder="Wohnort..." onChange={(e) => setDomicile(e.target.value)} />
                    <TextEditor title="Über mich:" />
                    <input type="submit" value="ProfilSpeichern" id="save-profile-button" className="main-button" />
                </form>
            </div>
        </div>
    );
}

export default ProfileSettingsPage;

{/*
import { useDispatch } from 'react-redux';

const [userState, setUserState] = useState(null);
    const dispatch = useDispatch();

    const logoutUserAction = () => dispatch(logoutUser());
    
    const logout = async() => {
        console.log("Benutzer wird ausgeloggt.");
        setUserState(null);
        await logoutUserAction();
        // TODO props.history.replace("/");
}

<Secondbutton link="/" onClick={logout}>Logout</Secondbutton>
*/}