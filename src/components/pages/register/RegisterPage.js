import React from 'react';

// css imports
import './RegisterPage.css';
import '../../gui/inputs/Inputfield.css';
import '../../gui/buttons/Mainbutton.css';

function RegisterPage() {
    return (
        <div className="register-form">
            <form>
                <h1>Registrieren</h1>
                <input type="text" placeholder="Benutzername..." className="inputfield" />
                <input type="email" placeholder="E-Mail..." className="inputfield" />
                <input type="password" placeholder="Passwort..." className="inputfield" />
                <button className="main-button">Registrieren</button>
            </form>
        </div>
    );
}

export default RegisterPage;