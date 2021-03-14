import React from 'react';

import { Redirect } from 'react-router-dom';

// TODO noch richtig implementieren
const Redirect = (props) => {
    const [routeRedirect, setRedirect] = useState(false);

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to={props.redirectTo} />
    }
}

export default Redirect;