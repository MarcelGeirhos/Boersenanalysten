import React, { useState, useEffect } from 'react';

// own module imports
import Mainbutton from '../gui/buttons/Mainbutton';
import Secondbutton from '../gui/buttons/Secondbutton';
import InputfieldDark from '../gui/inputs/InputfieldDark';
import { logoutUser } from '../../redux/actions/LogoutAction';

// css imports
import './Navigation.css';

// third party imports
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase/config';

function Navigation(props) {
    const loginSelector = useSelector((state) => state.logIn);
    const signinSelector = useSelector((state) => state.signIn);
    const [userState, setUserState] = useState(null);
    const dispatch = useDispatch();
    const logoutUserAction = () => dispatch(logoutUser());

    useEffect(() => {
        firebase.getUserState().then(user => {
            setUserState(user);
        })
    })

    const logout = async() => {
        console.log("logout user");
        setUserState(null);
        await logoutUserAction();
        props.history.replace("/");
    }

    let buttons;
    if ((loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
        (signinSelector.user && signinSelector.user.hasOwnProperty("user")) ||
        userState != null) {
        buttons = (
            <React.Fragment>
                <li><button className="logout" onClick={logout}>Logout</button></li>
            </React.Fragment>
        )
    } else {
        <div className="login-and-register">
            <Mainbutton link="/login">Login</Mainbutton>
            <Mainbutton link="/register">Registrieren</Mainbutton>
        </div>
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
                <div className="login-and-register">
                    <Mainbutton link="/login">Login</Mainbutton>
                    <Mainbutton link="/register">Registrieren</Mainbutton>
    </div>
            </nav>
        </header>
    );
}

export default Navigation;