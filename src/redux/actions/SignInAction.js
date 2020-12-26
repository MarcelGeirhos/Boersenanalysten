import firebase from '../../firebase/Config';

export const createUser = (email, password) => {
    return async function(dispatch) {
        const user = await firebase.signin(email, password);
        console.log(user);
        dispatch({type: 'CREATE_USER', payload: user});
    }
}