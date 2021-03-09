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
            document.getElementById("email-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("email-error-text").style.visibility = "hidden";
        return true;
    }

    const checkPassword = () => {
        if (password === "") {
            setPasswordErrorText('Bitte geben Sie ihr Passwort ein.');
            document.getElementById("password-error-text").style.visibility = "visible";
            return false;
        } else if (password.length < 6) {
            setPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            document.getElementById("password-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("password-error-text").style.visibility = "hidden";
        return true;
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <SettingsMenu parentCallbackUserData={callbackUserData} />
            <div className="email-settings-form">
                <label>E-Mail:</label>
                <InputfieldDark type="email" value={userData.email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorText id="email-error-text">{emailErrorText}</ErrorText>
                <label>Mit Passwort bestätigen:</label>
                <InputfieldDark type="password" onChange={(e) => setPassword(e.target.value)} />
                <ErrorText id="password-error-text">{passwordErrorText}</ErrorText>
                <input type="submit" onClick={update} value="Speichern" id="save-email-button" className="main-button" />
            </div>
        </div>
        
    );
}

export default EmailSettingsPage;

 {/*<div className="user-profile-grid-container"> </div>*/}