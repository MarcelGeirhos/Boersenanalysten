import React, { useState } from 'react';

// own module imports
import ErrorText from '../../gui/outputs/errorText/ErrorText';
import Inputfield from '../../gui/inputs/inputfield/Inputfield';

// css imports
import './LoginPage.css';

// third party imports
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("Error Text");
    const [passwordErrorText, setPasswordErrorText] = useState("Error Text");

    const [routeRedirect, setRedirect] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        let isEmailValid = checkEmail();
        let isPasswordValid = checkPassword();
        if (isEmailValid && isPasswordValid) {
            await loginUser();
        }
    }

    const loginUser = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            setRedirect(true);
            window.location.reload();
            console.log('Benutzer wurde erfolgreich eingeloggt.');
        })
        .catch(error => {
            console.log(error.code);
            switch (error.code) {
                case 'auth/invalid-email':
                    setEmailErrorText('E-Mail Adresse ist nicht valid.');
                    document.getElementById("email-error-text").style.visibility = "visible";
                    break;
                case 'auth/user-disabled':
                    setEmailErrorText('Account wurde gesperrt. Bitte melde dich beim Support.');
                    document.getElementById("email-error-text").style.visibility = "visible";
                    break;
                case 'auth/user-not-found':
                    setEmailErrorText('E-Mail Adresse ist nicht registriert.');
                    document.getElementById("email-error-text").style.visibility = "visible";
                    break;
                case 'auth/wrong-password':
                    setPasswordErrorText('Das Passwort ist nicht korrekt.');
                    document.getElementById("password-error-text").style.visibility = "visible";
                    break;
                default:
                    console.log('Unbekannter Fehler beim Benutzer Login: ' + error.code);
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
        } else if (password.length < 6) {
            setPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
            document.getElementById("password-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("password-error-text").style.visibility = "hidden";
        return true;
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return (
        <div className="login-form">
            <form onSubmit={login}>
                <h1>Login</h1>
                <Inputfield type="email" placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)} maxlength="60" />
                <ErrorText id="email-error-text">{emailErrorText}</ErrorText>
                <Inputfield type="password" placeholder="Passwort..." onChange={(e) => setPassword(e.target.value)} maxlength="50" />
                <ErrorText id="password-error-text">{passwordErrorText}</ErrorText>
                <Link to="/forgotPassword">
                    <p id="forgot-password-link">Passwort vergessen?</p>
                </Link>
                <input type="submit" value="Einloggen" id="login-button" className="main-button" />
            </form>
        </div>
    );
}

export default LoginPage;