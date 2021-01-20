import React, { useState } from 'react';

// own module imports
import ErrorText from '../../gui/outputs/errorText/ErrorText';
import Inputfield from '../../gui/inputs/inputfield/Inputfield';
import { registerUser } from '../../../redux/actions/RegisterAction';

// css imports
import './RegisterPage.css';

// third party imports
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("Error Text");
    const [passwordErrorText, setPasswordErrorText] = useState("Error Text");
    const [usernameErrorText, setUsernameErrorText] = useState("Error Text");
    
    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const registerUserAction = (email, password, username) => dispatch(registerUser(email, password, username));

    const register = async (e) => {
        e.preventDefault();
        let isEmailValid = checkEmail();
        let isPasswordValid = checkPassword();
        let isUsernameValid = checkUsername();
        if (isEmailValid && isPasswordValid && isUsernameValid) {
            await registerUserAction(email, password, username);
            setRedirect(true);
            console.log('Benutzer wurde erfolgreich registriert.');
        }
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

    const checkUsername = () => {
        if (username === "") {
            setUsernameErrorText('Bitte geben Sie einen Benutzername ein.');
            document.getElementById("username-error-text").style.visibility = "visible";
            return false;
        } else if (username.length < 5) {
            setPasswordErrorText('Der Benutzername muss mindestens 5 Zeichen lang sein.');
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