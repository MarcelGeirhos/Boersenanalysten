const createUser = (
    state = {
        user: {}
    },
    action) => {
        if (action.type === 'CREATE_USER') {
            state = {...state, user: action.payload}
        }
        return state;
    }

export default createUser;

/*
const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            console.log('REGISTER_SUCCESS');
            return {
                ...state,
                authError: null
            }
        case 'REGISTER_ERROR':
            console.log('REGISTER_ERROR');
            return {
                ...state,
                authError: action.error.message
            }
        default:
            return state;    
    }
}

export default authReducer;
*/