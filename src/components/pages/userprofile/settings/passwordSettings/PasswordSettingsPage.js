import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';

// css imports
import './PasswordSettingsPage.css';

// third party imports
import firebase from 'firebase/app';

// material-ui imports
import { TextField } from '@material-ui/core';

function PasswordSettingsPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatedPassword, setNewRepeatedPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newRepeatedPasswordError, setNewRepeatedPasswordError] = useState(false);
    const [oldPasswordErrorText, setOldPasswordErrorText] = useState("");
    const [newPasswordErrorText, setNewPasswordErrorText] = useState("");
    const [newRepeatedPasswordErrorText, setNewRepeatedPasswordErrorText] = useState("");

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
                    setOldPasswordError(true);
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
            setOldPasswordError(true);
            return false;
        } else if (oldPassword.length < 6) {
            setOldPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            setOldPasswordError(true);
            return false;
        }
        setOldPasswordError(false);
        return true;
    }

    const checkNewPassword = () => {
        if (newPassword === "" ) {
            setNewPasswordErrorText('Bitte geben Sie ihr neues Passwort ein.');
            setNewPasswordError(true);
            return false;
        } else if (newPassword.length < 6) {
            setNewPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            setNewPasswordError(true);
            return false;
        }
        setNewPasswordErrorText('');
        setNewPasswordError(false);
        return true;
    }

    const checkNewRepeatedPassword = () => {
        if (newRepeatedPassword === "" ) {
            setNewRepeatedPasswordErrorText('Bitte wiederholen Sie ihr neues Passwort.');
            setNewRepeatedPasswordError(true);
            return false;
        } else if (newRepeatedPassword.length < 6) {
            setNewRepeatedPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            setNewRepeatedPasswordError(true);
            return false;
        } else if (newPassword !== newRepeatedPassword) {
            setNewRepeatedPasswordErrorText('Passwörter stimmen nicht überein.');
            setNewRepeatedPasswordError(true);
            return false;
        }
        setNewRepeatedPasswordErrorText('');
        setNewRepeatedPasswordError(false);
        return true;
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={2} />
            <SettingsMenu />
            <div className="passwort-settings-form">
                <h2>Passwort ändern:</h2>
                <TextField
                    label="Altes Passwort"
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={oldPasswordError}
                    helperText={oldPasswordErrorText}
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                    <br />
                <TextField
                    label="Neues Passwort"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={newPasswordError}
                    helperText={newPasswordErrorText}
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                    <br />
                <TextField
                    label="Neues Passwort wiederholen"
                    type="password"
                    onChange={(e) => setNewRepeatedPassword(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={newRepeatedPasswordError}
                    helperText={newRepeatedPasswordErrorText}
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                    <br />
                <input type="submit" onClick={update} value="Passwort speichern" id="save-new-password-button" className="main-button" />
            </div>
        </div>
    );
}

export default PasswordSettingsPage;

{/*
<label>Altes Passwort:</label>
    <InputfieldDark type="password" onChange={(e) => setOldPassword(e.target.value)} />
    <ErrorText id="old-password-error-text">{oldPasswordErrorText}</ErrorText>
    <label>Neues Passwort:</label>
    <InputfieldDark type="password" onChange={(e) => setNewPassword(e.target.value)} />
    <ErrorText id="new-password-error-text">{newPasswordErrorText}</ErrorText>
    <label>Neues Passwort wiederholen:</label>
    <InputfieldDark type="password" onChange={(e) => setNewRepeatedPassword(e.target.value)} />
    <ErrorText id="new-repeated-password-error-text">{newRepeatedPasswordErrorText}</ErrorText>
*/}