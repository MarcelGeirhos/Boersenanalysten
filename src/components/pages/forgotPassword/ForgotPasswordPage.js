import React from 'react';

// own module imports
import Inputfield from '../../gui/inputs/inputfield/Inputfield';
import Mainbutton from '../../gui/buttons/mainbutton/Mainbutton';

// css imports
import './ForgotPasswordPage.css';

// third party imports
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
    return (
        <div className="forgot-password-form">
            <form>
                <h1>Passwort zurücksetzen</h1>
                <Inputfield type="email" placeholder="E-Mail..." />
                <Link to="/login">
                    <p>Zurück zum Login</p>
                </Link>
                <Mainbutton>E-Mail senden</Mainbutton>
            </form>
        </div>
    );
}

export default ForgotPasswordPage;