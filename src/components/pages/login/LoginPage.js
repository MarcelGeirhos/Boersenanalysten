import React, { useState } from 'react';

// css imports
import './LoginPage.css';

// third party imports
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

// material-ui imports
import {
    TextField,
    IconButton,
    InputAdornment
} from '@material-ui/core';

// material-ui icon imports
import {
    Visibility,
    VisibilityOff
 } from '@material-ui/icons';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            switch (error.code) {
                case 'auth/invalid-email':
                    setEmailErrorText('E-Mail Adresse ist nicht richtig formatiert.');
                    setEmailError(true);
                    break;
                case 'auth/user-disabled':
                    setEmailErrorText('Account wurde gesperrt. Bitte melde dich beim Support.');
                    setEmailError(true);
                    break;
                case 'auth/user-not-found':
                    setEmailErrorText('E-Mail Adresse ist nicht registriert.');
                    setEmailError(true);
                    break;
                case 'auth/wrong-password':
                    setPasswordErrorText('Das Passwort ist nicht korrekt.');
                    setPasswordError(true);
                    break;
                default:
                    console.log('Unbekannter Fehler beim Benutzer Login: ' + error);
                    break;
            }
        });
    }

    const checkEmail = () => {
        if (email === "") {
            setEmailErrorText('Bitte geben Sie ihre E-Mail Adresse ein.');
            setEmailError(true);
            return false;
        }
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
        setPasswordError(false);
        return true;
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/articleList" />
    }

    return (
        <div className="login-form">
            <form onSubmit={login}>
                <h1>Login</h1>
                <TextField
                    label="E-Mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                    className="login-text-field"
                    error={emailError}
                    helperText={emailErrorText}
                    autoFocus
                    inputProps={{ 
                        style: { color: 'white'},
                        maxLength: 50,
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                <TextField
                    label="Passwort"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="filled"
                    className="login-text-field"
                    error={passwordError}
                    helperText={passwordErrorText}
                    inputProps={{ 
                        style: { color: 'white'},
                        maxLength: 40,
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} 
                    InputProps={{
                        endAdornment:
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility style={{ color: 'white' }}/> : <VisibilityOff style={{ color: 'white' }}/>}
                          </IconButton>
                        </InputAdornment>
                    }} />
                <Link to="/forgotPassword">
                    <p id="forgot-password-link">Passwort vergessen?</p>
                </Link>
                <input type="submit" value="Einloggen" id="login-button" className="main-button" />
            </form>
        </div>
    );
}

export default LoginPage;