import React from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import Mainbutton from '../../gui/buttons/Mainbutton';

// css imports
import './LoginPage.css';

// third party imports
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="login-form">
            <form>
                <h1>Login</h1>
                <Inputfield type="email" placeholder="E-Mail..." />
                <Inputfield type="password" placeholder="Passwort..." />
                <Link to="/forgotPassword">
                    <p>Passwort vergessen?</p>
                </Link>
                <Mainbutton>Einloggen</Mainbutton>
            </form>
        </div>
    );
}

export default LoginPage;