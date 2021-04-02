import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './EmailSettingsPage.css';

// third party imports
import firebase from 'firebase/app';

// material-ui imports
import { TextField } from '@material-ui/core';

function EmailSettingsPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState([]);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    // Verbindung zur SettingsMenu Komponente um auf die Benutzerdaten 
    // Zugriff zu bekommen.
    const callbackUserData = (userData) => {
        setUserData(userData);
        setEmail(userData.email);
    }

    const update = async () => {
        let isEmailValid = checkEmail();
        let isPasswordValid = checkPassword();
        if (isEmailValid && isPasswordValid) {
            changeEmail(password, email);
        }
    }

    const changeEmail = (password, newEmail) => {
        reauthenticateUser(password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(async () => {
                await firebase.firestore().collection('users').doc(userData.uid).update({
                    email: email,
                })
                    .then(() => {
                        window.location.reload();
                        console.log("E-Mail wurde erfolgreich aktualisiert.");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
                .catch((error) => {
                    console.log(error.code);
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setEmailErrorText('E-Mail Adresse ist nicht richtig formatiert.');
                            document.getElementById("email-error-text").style.visibility = "visible";
                            break;
                        case 'auth/email-already-in-use':
                            setEmailErrorText('E-Mail Adresse ist bereits registriert.');
                            document.getElementById("email-error-text").style.visibility = "visible";
                            break;
                        default:
                            console.log('Unbekannter Fehler bei E-Mail Aktualisierung: ' + error);
                            break;
                    }
                });
        })
            .catch((error) => {
                console.log(error.code);
                switch (error.code) {
                    case 'auth/wrong-password':
                        setPasswordErrorText('Das Passwort ist nicht korrekt.');
                        document.getElementById("password-error-text").style.visibility = "visible";
                        break;
                    default:
                        console.log('Unbekannter Fehler bei E-Mail Aktualisierung: ' + error);
                        break;
                }
            });
    }

    const reauthenticateUser = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    const checkEmail = () => {
        if (email === "") {
            setEmailErrorText('Bitte geben Sie eine neue E-Mail Adresse ein.');
            setEmailError(true);
            return false;
        }
        setEmailErrorText('');
        setEmailError(false);
        return true;
    }

    const checkPassword = () => {
        if (password === "") {
            setPasswordErrorText('Bitte geben Sie ihr Passwort ein.');
            setPasswordError(true);
            return false;
        } else if (password.length < 6) {
            setPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            setPasswordError(true);
            return false;
        }
        setPasswordErrorText('');
        setPasswordError(false);
        return true;
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={2} />
            <SettingsMenu parentCallbackUserData={callbackUserData} />
            <div className="email-settings-form">
                <h2>E-Mail ändern:</h2>
                <TextField
                    label="E-Mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                    focused
                    className="register-text-field"
                    error={emailError}
                    value={email}
                    helperText={emailErrorText}
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                    <br />
                <TextField
                    label="Passwort"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={passwordError}
                    helperText={passwordErrorText}
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                    <br />
                <input type="submit" onClick={update} value="Speichern" id="save-email-button" className="main-button" />
            </div>
        </div>
        
    );
}

export default EmailSettingsPage;