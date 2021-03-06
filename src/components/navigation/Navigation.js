import React, { useState, useEffect } from 'react';

// own module imports
import Mainbutton from '../gui/buttons/mainbutton/Mainbutton';
import Iconbutton from '../gui/buttons/iconbutton/Iconbutton';
import Secondbutton from '../gui/buttons/secondbutton/Secondbutton';
import ChoiceDialog from '../gui/outputs/dialogs/choiceDialog/ChoiceDialog';
import firebaseConfig from '../../firebase/Config';

// css imports
import './Navigation.css';

// third party imports
import firebase from 'firebase/app';
import {
    Link,
    Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui icon imports
import {
    Person,
    Message,
    ExitToApp,
    ContactSupport,
} from '@material-ui/icons';

// material-ui imports
import { TextField } from '@material-ui/core';

function Navigation() {
    const loginSelector = useSelector((state) => state.logIn);
    const registerSelector = useSelector((state) => state.register);
    const [routeRedirect, setRedirect] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [userState, setUserState] = useState(null);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        firebaseConfig.getUserState().then(async (user) => {
            setUserState(user);
            if (user != null) {
                const userData = await firebase.firestore().collection('users').doc(user.uid).get();
                setUserData(userData.data());
            }
        })
    }, [])

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    
    const logout = async () => {
        await firebase.auth().signOut().catch(error => {
            console.log(error); 
        });
        setUserState(null);
        setOpenDialog(false);
        setRedirect(true);
        window.location.reload();
        console.log("Benutzer hat sich erfolgreich ausgeloggt.");
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    // Wenn der Benutzer nicht registriert oder eingeloggt ist wird
    // ihm ein Button für den Login und die Registrierung angezeigt.
    // Wenn der Benuter eingeloggt ist werden ihm Buttons zu seinem
    // Profil, Nachrichten und zur Hilfe angezeigt.
    let buttons;
    if ((loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
        (registerSelector.user && registerSelector.user.hasOwnProperty("user")) ||
        userState != null) {
        buttons = (
            <div className="navbar-right">
                <Link to={{pathname: `/userprofile/${userState.uid}`}} id="username">{userData.shareCounter} {userData.username}</Link>
                <Iconbutton link={{pathname: `/userprofile/${userState.uid}`}}><Person /></Iconbutton>
                <Iconbutton link={{pathname: `/messages/${userState.uid}`}}><Message /></Iconbutton>
                <Iconbutton link="/help"><ContactSupport /></Iconbutton>
                <Iconbutton onClick={handleClickOpen}><ExitToApp /></Iconbutton>
                <ChoiceDialog
                    openDialog={openDialog}
                    title="Ausloggen"
                    content="Wollen Sie sich wirklich ausloggen?"
                    onYesClick={logout}
                    onNoClick={handleClose} />
            </div>
        )
    } else {
        buttons = (
            <div className="navbar-right">
                <Secondbutton link="/login">Login</Secondbutton>
                <Mainbutton link="/register">Registrieren</Mainbutton>
            </div>
        )
    }

    return (
        <header>
            <nav>
                <div className="title">
                    <Link to="/">
                        <h1>Boersenanalysten</h1>
                    </Link>
                </div>
                <div className="search">
                    <Secondbutton link="/tags">Tags</Secondbutton>
                    <Mainbutton link="/articleList">Beiträge</Mainbutton>
                    <TextField
                        label="Suche..."
                        type="text"
                        size="small"
                        //onChange={(e) => setEmail(e.target.value)}
                        variant="filled"
                        //className="register-text-field"
                        //error={emailError}
                        //value={email}
                        //helperText={emailErrorText}
                        inputProps={{
                            style: { color: 'white'},
                            maxLength: 100,
                        }}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }} />
                    <Secondbutton link="/" id="search-button">Suchen</Secondbutton>
                </div>
                {buttons}
            </nav>
        </header>
    );
}

export default Navigation;