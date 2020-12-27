import React, { useState } from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
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
    
    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const registerUserAction = (email, password, username) => dispatch(registerUser(email, password, username));

    const register = async (e) => {
        e.preventDefault();
        // TODO
        if (email !== "" && password !== "" && username !== "") {
            await registerUserAction(email, password, username);
            setRedirect(true);
        } else {
            console.log("Leere Eingabefelder");
        }
        console.log('Benutzer wurde registriert.');
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
                <Inputfield type="password" placeholder="Passwort..." onChange={(e) => setPassword(e.target.value)} />
                <Inputfield type="text" placeholder="Benutzername..." onChange={(e) => setUsername(e.target.value)} />
                <input type="submit" value="Registrieren" id="register-button" className="main-button" />
            </form>
        </div>
    );
}

export default RegisterPage;