import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';
import ErrorText from '../../../../gui/outputs/errorText/ErrorText';
import InputfieldDark from '../../../../gui/inputs/inputfieldDark/InputfieldDark';

// css imports
import './EmailSettingsPage.css';

// third party imports
import firebase from 'firebase/app';

function EmailSettingsPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState([]);
    const [emailErrorText, setEmailErrorText] = useState("Error Text");
    const [passwordErrorText, setPasswordErrorText] = useState("Error Text");

    // Verbindung zur SettingsMenu Komponente um auf die Benutzerdaten 
    // Zugriff zu bekommen.
    const callbackUserData = (userData) => {
        setUserData(userData);
    }

    const update = async () => {
        let isEmailValid = checkEmail();
        if (isEmailValid) {
            changeEmail(password, email);
        }
    }

    const changeEmail = (password, newEmail) => {
        reauthenticateUser(password).then(() => {
          var user = firebase.auth().currentUser;
          user.updateEmail(newEmail).then(async () => {
            await firebase.firestore().collection('users').doc(userData.uid).update({
                email: email,
            })
            .then(() => {
                window.location.reload();
                console.log("E-Mail wurde erfolgreich aktualisiert.");
            })
            .catch(error => { console.log(error); })
          }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }

    const reauthenticateUser = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    const checkEmail = () => {
        if (email === "") {
            setEmailErrorText('Bitte geben Sie eine E-Mail ein.');
            document.getElementById("email-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("email-error-text").style.visibility = "hidden";
        return true;
    }

    // TODO hier weitermachen Passwort Fehleingaben abfangen.

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu parentCallbackUserData={callbackUserData} />
            <div className="email-settings-form">
                <label>E-Mail:</label>
                <InputfieldDark type="email" placeholder={userData.email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorText id="email-error-text">{emailErrorText}</ErrorText>
                <label>Passwort bestätigen:</label>
                <InputfieldDark type="password" onChange={(e) => setPassword(e.target.value)} />
                <ErrorText id="password-error-text">{passwordErrorText}</ErrorText>
                <input type="submit" onClick={update} value="Speichern" id="save-email-button" className="main-button" />
            </div>
        </div>
    );
}

export default EmailSettingsPage;

/*
<form onSubmit={update}>
</form>
*/