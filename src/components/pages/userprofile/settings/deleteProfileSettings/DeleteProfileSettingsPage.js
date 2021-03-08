import React, { useState } from 'react';

// own module imports
import SettingsMenu from './../settingsMenu/SettingsMenu';
import UserprofileNavigation from '../../UserprofileNavigation';
import ErrorText from '../../../../gui/outputs/errorText/ErrorText';
import Mainbutton from '../../../../gui/buttons/mainbutton/Mainbutton';
import InputfieldDark from '../../../../gui/inputs/inputfieldDark/InputfieldDark';

// css imports
import './DeleteProfileSettingsPage.css';

// third party imports
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

function DeleteProfileSettingsPage() {
    const [routeRedirect, setRedirect] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("Error Text");

    function setCheckbox() {
        const checked = document.getElementById("delete-profile-checkbox").checked;
        if (checked) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    function deleteProfile() {
        let isPasswordValid = checkPassword();
        if (isPasswordValid) {
            reauthenticateUser(password).then(() => {
                let user = firebase.auth().currentUser;
                firebase.firestore().collection("users").doc(user.uid).collection("articles").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        firebase.firestore().collection("users").doc(user.uid).collection("articles").doc(doc.id).delete();
                    });
                });
                firebase.firestore().collection("users").doc(user.uid).collection("answers").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        firebase.firestore().collection("users").doc(user.uid).collection("answers").doc(doc.id).delete();
                    });
                });
                firebase.firestore().collection("users").doc(user.uid).delete().then(() => {
                    user.delete().then(async () => {
                        await firebase.auth().signOut().then(() => {
                            setRedirect(true);
                            window.location.reload();
                        }).catch(error => {
                            console.log(error.code); 
                        });
                    }).catch((error) => {
                        console.log(error.code);
                    });
                }).catch((error) => {
                    console.log(error.code);
                });
            }).catch((error) => {
                console.log(error.code);
                switch (error.code) {
                    case 'auth/wrong-password':
                        setPasswordErrorText('Das Passwort ist nicht korrekt.');
                        document.getElementById("password-error-text").style.visibility = "visible";
                        break;
                    default:
                        console.log('Unbekannter Fehler bei Profil löschen: ' + error);
                        break;
                }
            });
        }
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    function reauthenticateUser(oldPassword) {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldPassword);
        return user.reauthenticateWithCredential(cred);
    }

    function checkPassword() {
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
            <SettingsMenu />
            <div className="delete-profile-section">
                <h1>Profil löschen</h1>
                <p>Bevor Sie ihr Profil löschen beachten Sie bitte folgende Informationen:</p>
                <ul>
                    <li>Das Wiederherstellen des Profils ist nicht möglich und kann nicht rückgängig gemacht werden.</li>
                    <li>Die (Portfolio)-beiträge und Antworten bleiben erhalten und werden nicht gelöscht. Der Ersteller wird auf Anonym gesetzt, sodass keine Rückverfolgung möglich ist.</li>
                </ul>
                <input type="checkbox" id="delete-profile-checkbox" name="profil-loeschen" onClick={setCheckbox}/>
                <label for="delete-profile">Ich habe die oben genannten Informationen verstanden.</label>
                <label id="password-label">Mit Passwort bestätigen:</label>
                <InputfieldDark type="password" onChange={(e) => setPassword(e.target.value)} />
                <ErrorText id="password-error-text">{passwordErrorText}</ErrorText>
                <Mainbutton id="delete-profile-button" onClick={deleteProfile} disabled={buttonDisabled}>Profil löschen</Mainbutton>
            </div>
        </div>
    );
}

export default DeleteProfileSettingsPage;