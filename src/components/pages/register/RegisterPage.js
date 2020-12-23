import React from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import Mainbutton from '../../gui/buttons/Mainbutton';
import { registerUser } from '../../../redux/actions/AuthActions';

// css imports
import './RegisterPage.css';

function RegisterPage() {
    return (
        <div className="register-form">
            <form>
                <h1>Registrieren</h1>
                <Inputfield type="text" placeholder="Benutzername..." />
                <Inputfield type="email" placeholder="E-Mail..." />
                <Inputfield type="password" placeholder="Passwort..." />
                <Mainbutton>Registrieren</Mainbutton>
            </form>
        </div>
    );
}

export default RegisterPage;