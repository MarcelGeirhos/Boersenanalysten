const registerUser = (
    state = {
        user: {}
    },
    action) => {
        if (action.type === 'REGISTER_USER') {
            state = {...state, user: action.payload}
        }
        return state;
    }

export default registerUser;