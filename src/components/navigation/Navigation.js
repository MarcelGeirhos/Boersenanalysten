import React, { useState, useEffect } from 'react';

// own module imports
import Mainbutton from '../gui/buttons/Mainbutton';
import Secondbutton from '../gui/buttons/Secondbutton';
import InputfieldDark from '../gui/inputs/InputfieldDark';
import { logoutUser } from '../../redux/actions/LogoutAction';
import firebase from '../../firebase/Config';

// css imports
import './Navigation.css';

// third party imports
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Navigation(props) {
    const loginSelector = useSelector((state) => state.logIn);
    const registerSelector = useSelector((state) => state.register);

    const [userState, setUserState] = useState(null);
    const dispatch = useDispatch();
    const logoutUserAction = () => dispatch(logoutUser());

    useEffect(() => {
        firebase.getUserState().then(user => {
            setUserState(user);
        })
    })

    const logout = async() => {
        console.log("Benutzer wird ausgeloggt.");
        setUserState(null);
        await logoutUserAction();
        // TODO props.history.replace("/");
    }

    let buttons;
    if ((loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
        (registerSelector.user && registerSelector.user.hasOwnProperty("user")) ||
        userState != null) {
        buttons = (
            <div className="navbar-right">
                <Mainbutton link="/userprofile">Profil</Mainbutton>
                <Secondbutton link="/" onClick={logout}>Logout</Secondbutton>
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