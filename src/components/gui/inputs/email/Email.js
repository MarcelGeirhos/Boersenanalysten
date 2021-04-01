import React, { useState } from 'react';

// material-ui imports
import { TextField } from '@material-ui/core';

// TODO Diese Komponente wird bisher noch nicht verwendet
// muss noch überlegt werden wie diese am besten implementiert und
// in verschiedene Seiten eingebunden werden kann.
function Email(props) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");

    const checkEmail = () => {
        if (email === "") {
            setEmailErrorText('Bitte geben Sie eine neue E-Mail Adresse ein.');
            setEmailError(true);
            return false;
        }
        setEmailErrorText('');
        setEmailError(false);
        return true;
    }

    return (
        <TextField
            label="E-Mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            focused
            className="register-text-field"
            error={emailError}
            value={props.email}
            helperText={emailErrorText}
            inputProps={{ style: { color: 'white'}}}
            InputLabelProps={{
                style: { color: 'white' },
        }} />
    );
}

export default Email;