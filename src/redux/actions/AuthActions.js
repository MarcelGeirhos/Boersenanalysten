export const registerUser = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                email: newUser.email,
            })
        }).then(() => {
            dispatch({
                type: 'REGISTER_SUCCESS' })
        }).catch(error => {
            dispatch({
                type: 'REGISTER_ERROR', error })
        }) 
    }
}