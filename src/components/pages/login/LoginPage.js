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
        if (email !== "" && password !== "") {
            let user = await logInUserAction(email, password);
            console.log(user);
            if (user) {
                setRedirect(true);
            }
        } else {
            console.log("Leere Eingabefelder");
        }
        console.log('Benutzer eingeloggt');
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return (
        <div className="login-form">
            <form onSubmit={login}>
                <h1>Login</h1>
                <input type="email" placeholder="E-Mail..." className="inputfield" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Passwort..." className="inputfield" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Einloggen" />
                {/*<Inputfield type="email" placeholder="E-Mail..." />
                <Inputfield type="password" placeholder="Passwort..." />
                <Link to="/forgotPassword">
                    <p>Passwort vergessen?</p>
                </Link>
                <Mainbutton>Einloggen</Mainbutton>*/}
            </form>
        </div>
    );
}

export default LoginPage;