import React, { useState } from 'react';

// own module imports
import Mainbutton from '../../gui/buttons/mainbutton/Mainbutton';

// css imports
import './ForgotPasswordPage.css';

// third party imports
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

// material-ui imports
import { TextField } from '@material-ui/core';

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");

    const resetPassword = async (e) => {
        e.preventDefault();
        let isEmailValid = checkEmail();
        if (isEmailValid) {
            await firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('E-Mail wurde gesendet...');
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const checkEmail = () => {
        if (email === "") {
            setEmailErrorText('Bitte geben Sie ihre E-Mail Adresse ein.');
            setEmailError(true);
            return false;
        }
        setEmailErrorText('');
        setEmailError(false);
        return true;
    }

    return (
        <div className="forgot-password-form">
            <form>
                <h1>Passwort zurücksetzen</h1>
                <TextField
                    label="E-Mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                    className="forgot-password-text-field"
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
                <Link to="/login">
                    <p>Zurück zum Login</p>
                </Link>
                <Mainbutton onClick={resetPassword}>E-Mail senden</Mainbutton>
            </form>
        </div>
    );
}

export default ForgotPasswordPage;