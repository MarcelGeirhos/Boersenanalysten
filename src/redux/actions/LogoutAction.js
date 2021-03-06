import firebase from '../../firebase/Config';

export const logoutUser = () => {
    return async function(dispatch) {
        await firebase.logout();
        dispatch({type: "LOGIN_USER", payload: {}});
        dispatch({type: "REGISTER_USER", payload: {}})
    }
}