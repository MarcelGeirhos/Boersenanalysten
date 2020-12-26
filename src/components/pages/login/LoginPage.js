import React, { useState } from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import Mainbutton from '../../gui/buttons/Mainbutton';
import { loginUser } from '../../../redux/actions/LoginAction';

// css imports
import './LoginPage.css';

// third party imports
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const logInUserAction = (email, password) => dispatch(loginUser(email, password));

    const login = async (e) => {
        e.preventDefault();
        // TODO
        if (email !== "" && password !== "") {
            let user = await logInUserAction(email, password);
            console.log(user);
            if (user) {
                setRedirect(true);
            }
        } else {
            console.log("Leere Eingabefelder");
        }
        console.log('Benutzer wurde eingeloggt.');
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return (
        <div className="login-form">
            <form onSubmit={login}>
                <h1>Login</h1>
                <Inputfield type="email" placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)}/>
                <Inputfield type="password" placeholder="Passwort..." onChange={(e) => setPassword(e.target.value)} />
                <Link to="/forgotPassword">
                    <p>Passwort vergessen?</p>
                </Link>
                <input type="submit" value="Einloggen" id="login-button" className="main-button" />
            </form>
        </div>
    );
}

export default LoginPage;