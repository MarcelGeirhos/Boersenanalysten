import React, { useState } from 'react';

// own module imports
import ErrorText from '../../gui/outputs/errorText/ErrorText';
import Inputfield from '../../gui/inputs/inputfield/Inputfield';

// css imports
import './RegisterPage.css';

// third party imports
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("Error Text");
    const [passwordErrorText, setPasswordErrorText] = useState("Error Text");
    const [usernameErrorText, setUsernameErrorText] = useState("Error Text");
    
    const [routeRedirect, setRedirect] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        let isEmailValid = checkEmail();
        let isPasswordValid = checkPassword();
        let isUsernameValid = checkUsername(); 
        if (isEmailValid && isPasswordValid && isUsernameValid) {
            await registerUser();
        }
    }

    const registerUser = async () => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            firebase.firestore().collection('users').doc(user.user.uid).set({
                uid: user.user.uid,
                username: username,
                email: email,
                location: "",
                portfolioLink: "",
                userDescription: "",
                shareCounter: 0,
                answerCounter: 0,
                articleCounter: 0,
                portfolioArticleCounter: 0,
                createdAt: new Date(),
            })
            .catch(error => {
                console.log(error);
            });
            console.log(user);
            setRedirect(true);
            window.location.reload();
            console.log('Benutzer wurde erfolgreich registriert.');
            return user;
        })
        .catch(error => {
            console.log(error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setEmailErrorText('E-Mail Adresse wird bereits verwendet.');
                    document.getElementById("email-error-text").style.visibility = "visible";
                    break;
                case 'auth/weak-password':
                    setPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
                    document.getElementById("password-error-text").style.visibility = "visible";
                    break;
                default:
                    console.log('Unbekannter Fehler bei Benutzer Registrierung: ' + error.code);
                    break;
            }
        }); 
    }

    const checkEmail = () => {
        if (email === "") {
            setEmailErrorText('Bitte geben Sie ihre E-Mail Adresse ein.');
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
        }
        document.getElementById("password-error-text").style.visibility = "hidden";
        return true;
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

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return (
        <div className="register-form">
            <form onSubmit={register}>
                <h1>Registrieren</h1>
                <Inputfield type="email" placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)} />
                <ErrorText id="email-error-text">{emailErrorText}</ErrorText>
                <Inputfield type="password" placeholder="Passwort..." onChange={(e) => setPassword(e.target.value)} />
                <ErrorText id="password-error-text">{passwordErrorText}</ErrorText>
                <Inputfield type="text" placeholder="Benutzername..." onChange={(e) => setUsername(e.target.value)} />
                <ErrorText id="username-error-text">{usernameErrorText}</ErrorText>
                <input type="submit" value="Registrieren" id="register-button" className="main-button" />
            </form>
        </div>
    );
}

export default RegisterPage;