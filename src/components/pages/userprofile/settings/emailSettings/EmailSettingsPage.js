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
    const [userData, setUserData] = useState([]);
    const [emailErrorText, setEmailErrorText] = useState("Error Text");

    // Verbindung zur SettingsMenu Komponente um auf die Benutzerdaten 
    // Zugriff zu bekommen.
    const callbackUserData = (userData) => {
        setUserData(userData);
    }

    const update = async () => {
        let isEmailValid = checkEmail();
        if (isEmailValid) {
            await updateEmail();
        }
    }

    const updateEmail = async () => {
        const user = firebase.auth().currentUser;
        console.log(user);
        user.updateEmail(email);
        // TODO hier weitermachen Benutzer erneut einloggen siehe Medium Artikel wurde in Firefox Lesezeichen abgespeichert!
        /*await firebase.firestore().collection('users').doc(userData.uid).update({
            email: email,
        })
        .catch(error => {
            console.log(error);
            return null;
        })
        window.location.reload();
        console.log('Email wurde erfolgreich aktualisiert.');*/
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

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu parentCallbackUserData={callbackUserData} />
            <div className="email-settings-form">
                
                    <label>E-Mail:</label>
                    <InputfieldDark type="email" placeholder={userData.email} onChange={(e) => setEmail(e.target.value)} />
                    <ErrorText id="email-error-text">{emailErrorText}</ErrorText>
                    <input type="submit" value="Speichern" id="save-email-button" className="main-button" onClick={update}/>
                
            </div>
        </div>
    );
}

export default EmailSettingsPage;

/*
<form onSubmit={update}>
</form>
*/