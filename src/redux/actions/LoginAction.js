import firebase from '../../firebase/Config';

export const loginUser = (email, password) => {
    return async function(dispatch) {
        const user = await firebase.login(email, password).catch(error => console.log(error));
        if (user) {
            dispatch({type: 'LOGIN_USER', payload: user});
            return user;
        }
    }
}