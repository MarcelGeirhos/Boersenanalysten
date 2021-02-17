import React, { useState, useEffect } from 'react';

// own module imports
import Mainbutton from '../gui/buttons/mainbutton/Mainbutton';
import Iconbutton from '../gui/buttons/iconbutton/Iconbutton';
import Secondbutton from '../gui/buttons/secondbutton/Secondbutton';
import InputfieldDark from '../gui/inputs/inputfieldDark/InputfieldDark';
import firebase from '../../firebase/Config';

// css imports
import './Navigation.css';

// third party imports
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui icon imports
import {
    Person,
    Message,
    ContactSupport,
} from '@material-ui/icons';

function Navigation() {
    const loginSelector = useSelector((state) => state.logIn);
    const registerSelector = useSelector((state) => state.register);
    
    const [userState, setUserState] = useState(null);

    // TODO hier weitermachen und Fehler abfangen
    useEffect(() => {
        firebase.getUserState().then(user => {
            const getUser = async () => {
                setUserState(user);
            }
            getUser();
        })
    })

    let buttons;
    if ((loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
        (registerSelector.user && registerSelector.user.hasOwnProperty("user")) ||
        userState != null) {
        buttons = (
            <div className="navbar-right">
                <Iconbutton link={{pathname: `/userprofile/${userState.uid}`}}><Person /></Iconbutton>
                <Iconbutton link={{pathname: `/messages/${userState.uid}`}}><Message /></Iconbutton>
                <Iconbutton link="/help"><ContactSupport /></Iconbutton>
            </div>
        )
    } else {
        buttons = (
            <div className="navbar-right">
                <Mainbutton link="/login">Login</Mainbutton>
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
                    <InputfieldDark type="text" placeholder="Suchen..." />
                    <Secondbutton link="/">Suchen</Secondbutton>
                </div>
                {buttons}
            </nav>
        </header>
    );
}

export default Navigation;