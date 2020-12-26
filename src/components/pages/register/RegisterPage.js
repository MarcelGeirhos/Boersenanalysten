import React, { useState } from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import { createUser } from '../../../redux/actions/SignInAction';

// css imports
import './RegisterPage.css';

// third party imports
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const createUserAction = (email, password) => dispatch(createUser(email, password));

    const signin = async (e) => {
        e.preventDefault();
        // TODO
        if (email !== "" && password !== "") {
            await createUserAction(email, password);
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
            <form onSubmit={signin}>
                <h1>Registrieren</h1>
                <Inputfield type="email" placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)} />
                <Inputfield type="password" placeholder="Passwort..." onChange={(e) => setPassword(e.target.value)} />
                <Inputfield type="text" placeholder="Benutzername..." />
                <input type="submit" value="Registrieren" id="register-button" className="main-button" />
            </form>
        </div>
    );
}

export default RegisterPage;