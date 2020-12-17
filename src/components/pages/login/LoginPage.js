import React from 'react';

// css imports
import './LoginPage.css';
import '../../gui/inputs/Inputfield.css';
import '../../gui/buttons/Mainbutton.css';

function LoginPage() {
    return (
        <div className="login-form">
            <form>
                <h1>Login</h1>
                <input type="email" placeholder="E-Mail..." className="inputfield" />
                <input type="password" placeholder="Passwort..." className="inputfield" />
                <p>Passwort vergessen?</p>
                <button className="main-button">Einloggen</button>
            </form>
        </div>
    );
}

export default LoginPage;