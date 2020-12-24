import React, { useState } from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import Mainbutton from '../../gui/buttons/Mainbutton';
import { createUser } from '../../../redux/actions/SignInAction';

// css imports
import './RegisterPage.css';
import { useDispatch } from 'react-redux';

// third party imports
import { Redirect } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const createUserAction = (email, password) => dispatch(createUser(email, password));

    const signin = async (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            await createUserAction(email, password);
            setRedirect(true);
        } else {
            console.log("Leere Eingabefelder");
        }
        console.log('Benutzer erstellt');
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return (
        <div className="register-form">
            <form onSubmit={signin}>
                <h1>Registrieren</h1>
                <input type="email" placeholder="E-Mail..." className="inputfield" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Passwort..." className="inputfield" onChange={(e) => setPassword(e.target.value)} />
                <Inputfield type="text" placeholder="Benutzername..." />
                {/*<Inputfield type="email" placeholder="E-Mail..." />*/}
                {/*<Inputfield type="password" placeholder="Passwort..." />*/}
                {/*<Mainbutton>Registrieren</Mainbutton>*/}
                <input type="submit" value="Registrieren" />
            </form>
        </div>
    );
}

export default RegisterPage;