import firebase from '../../firebase/Config';

export const registerUser = (email, password) => {
    return async function(dispatch) {
        const user = await firebase.register(email, password);
        console.log(user);
        dispatch({type: 'REGISTER_USER', payload: user});
    }
}