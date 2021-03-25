import React, { useState } from 'react';

// css imports
import './RegisterPage.css';

// third party imports
import { Redirect } from 'react-router-dom';
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

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
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
                domicile: "",
                portfolioLink: "",
                aboutMe: "",
                shareCounter: 0,
                answerCounter: 0,
                articleCounter: 0,
                portfolioArticleCounter: 0,
                createdAt: new Date(),
            }).then(async () => {
                const articleCol = await firebase.firestore().collection('users').doc(user.user.uid).collection('articles').doc().get();
                await firebase.firestore().collection('users').doc(user.user.uid).collection('articles').doc(articleCol.id).set({
                    createdAt: new Date(),
                    articleRefs: [],
                })
                const portfolioArticleCol = await firebase.firestore().collection('users').doc(user.user.uid).collection('portfolioArticles').doc().get();
                await firebase.firestore().collection('users').doc(user.user.uid).collection('portfolioArticles').doc(portfolioArticleCol.id).set({
                    createdAt: new Date(),
                    portfolioArticleRefs: [],
                })
                const answerCol = await firebase.firestore().collection('users').doc(user.user.uid).collection('answers').doc().get();
                await firebase.firestore().collection('users').doc(user.user.uid).collection('answers').doc(answerCol.id).set({
                    createdAt: new Date(),
                    answerRefs: [],
                })
                const votingsCol = await firebase.firestore().collection('users').doc(user.user.uid).collection('votings').doc().get();
                await firebase.firestore().collection('users').doc(user.user.uid).collection('votings').doc(votingsCol.id).set({
                    createdAt: new Date(),
                    votingRefs: [],
                }).then(async () => {
                    firebase.firestore().collection('users').doc(user.user.uid).update({
                        articleSubColIds: [articleCol.id],
                        portfolioArticleSubColIds: [portfolioArticleCol.id],
                        answerSubColIds: [answerCol.id],
                        votingSubColIds: [votingsCol.id],
                    })
                })
                console.log(user);
                setRedirect(true);
                window.location.reload();
                console.log('Benutzer wurde erfolgreich registriert.');
                return user;
            })
            .catch(error => {
                console.log(error);
                return null;
            });
        })
        .catch(error => {
            console.log(error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setEmailErrorText('E-Mail Adresse ist bereits registriert.');
                    setEmailError(true);
                    break;
                case 'auth/weak-password':
                    setPasswordErrorText('Das Passwort muss mindestens 6 Zeichen lang sein.');
                    setPasswordError(true);
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
        }
        setPasswordErrorText('');
        setPasswordError(false);
        return true;
    }

    const checkUsername = () => {
        if (username === "") {
            setUsernameErrorText('Bitte geben Sie einen Benutzername ein.');
            setUsernameError(true);
            return false;
        } else if (username.length < 5) {
            setUsernameErrorText('Der Benutzername muss mindestens 5 Zeichen lang sein.');
            setUsernameError(true);
            return false;
        }
        setUsernameErrorText('');
        setUsernameError(false);
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
        <div className="register-form">
            <form onSubmit={register}>
                <h1>Registrieren</h1>
                <TextField
                    label="Benutzername"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={usernameError}
                    helperText={usernameErrorText}
                    autoFocus
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                <TextField
                    label="E-Mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={emailError}
                    helperText={emailErrorText}
                    inputProps={{ style: { color: 'white'}}}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                <TextField
                    label="Passwort"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="filled"
                    className="register-text-field"
                    error={passwordError}
                    helperText={passwordErrorText}
                    inputProps={{ style: { color: 'white'}}}
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
                <input type="submit" value="Registrieren" id="register-button" className="main-button" />
            </form>
        </div>
    );
}

export default RegisterPage;