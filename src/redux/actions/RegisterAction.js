import firebase from '../../firebase/Config';

export const registerUser = (email, password, username) => {
    return async function(dispatch) {
        const user = await firebase.register(email, password, username);
        console.log(user);
        dispatch({type: 'REGISTER_USER', payload: user});
    }
}