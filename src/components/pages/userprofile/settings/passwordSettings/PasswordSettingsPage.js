import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';
import ErrorText from '../../../../gui/outputs/errorText/ErrorText';
import InputfieldDark from '../../../../gui/inputs/inputfieldDark/InputfieldDark';

// css imports
import './PasswordSettingsPage.css';

// third party imports
import firebase from 'firebase/app';

function PasswordSettingsPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatedPassword, setNewRepeatedPassword] = useState("");
    const [oldPasswordErrorText, setOldPasswordErrorText] = useState("Error Text");
    const [newPasswordErrorText, setNewPasswordErrorText] = useState("Error Text");
    const [newRepeatedPasswordErrorText, setNewRepeatedPasswordErrorText] = useState("Error Text");

    const update = async () => {
        let isOldPasswordValid = checkOldPassword();
        let isNewPasswordValid = checkNewPassword();
        let isNewRepeatedPasswordValid = checkNewRepeatedPassword();
        if (isOldPasswordValid && isNewPasswordValid && isNewRepeatedPasswordValid) {
            changePassword(oldPassword, newPassword);
        }
    }

    const changePassword = (oldPassword, newPassword) => {
        reauthenticateUser(oldPassword).then(() => {
            const user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(async () => {
                window.location.reload();
                console.log("Passwort wurde erfolgreich aktualisiert.");
            }).catch((error) => {
                 console.log(error.code);
            });
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case 'auth/wrong-password':
                    setOldPasswordErrorText('Das Passwort ist nicht korrekt.');
                    document.getElementById("old-password-error-text").style.visibility = "visible";
                    break;
                default:
                    console.log('Unbekannter Fehler bei Passwort Aktualisierung: ' + error);
                    break;
            }
        });
    }

    const reauthenticateUser = (oldPassword) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const checkOldPassword = () => {
        if (oldPassword === "" ) {
            setOldPasswordErrorText('Bitte geben Sie ihr Passwort ein.');
            document.getElementById("old-password-error-text").style.visibility = "visible";
            return false;
        } else if (oldPassword.length < 6) {
            setOldPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            document.getElementById("old-password-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("old-password-error-text").style.visibility = "hidden";
        return true;
    }

    const checkNewPassword = () => {
        if (newPassword === "" ) {
            setNewPasswordErrorText('Bitte geben Sie ihr neues Passwort ein.');
            document.getElementById("new-password-error-text").style.visibility = "visible";
            return false;
        } else if (newPassword.length < 6) {
            setNewPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            document.getElementById("new-password-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("new-password-error-text").style.visibility = "hidden";
        return true;
    }

    const checkNewRepeatedPassword = () => {
        if (newRepeatedPassword === "" ) {
            setNewRepeatedPasswordErrorText('Bitte geben Sie ihr neues Passwort ein.');
            document.getElementById("new-repeated-password-error-text").style.visibility = "visible";
            return false;
        } else if (newRepeatedPassword.length < 6) {
            setNewRepeatedPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            document.getElementById("new-repeated-password-error-text").style.visibility = "visible";
            return false;
        } else if (newPassword !== newRepeatedPassword) {
            setNewRepeatedPasswordErrorText('Passwörter stimmen nicht überein.');
            document.getElementById("new-repeated-password-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("new-repeated-password-error-text").style.visibility = "hidden";
        return true;
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={2} />
            <SettingsMenu />
            <div className="passwort-settings-form">
                <label>Altes Passwort:</label>
                <InputfieldDark type="password" onChange={(e) => setOldPassword(e.target.value)} />
                <ErrorText id="old-password-error-text">{oldPasswordErrorText}</ErrorText>
                <label>Neues Passwort:</label>
                <InputfieldDark type="password" onChange={(e) => setNewPassword(e.target.value)} />
                <ErrorText id="new-password-error-text">{newPasswordErrorText}</ErrorText>
                <label>Neues Passwort wiederholen:</label>
                <InputfieldDark type="password" onChange={(e) => setNewRepeatedPassword(e.target.value)} />
                <ErrorText id="new-repeated-password-error-text">{newRepeatedPasswordErrorText}</ErrorText>
                <input type="submit" onClick={update} value="Passwort speichern" id="save-new-password-button" className="main-button" />
            </div>
        </div>
    );
}

export default PasswordSettingsPage;