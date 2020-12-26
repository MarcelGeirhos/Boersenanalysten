// own module imports
import registerUser from './RegisterReducer';
import loginUser from './LoginReducer';
import logoutUser from './LogoutReducer';

// third party imports
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    register: registerUser,
    logIn: loginUser,
    logOut: logoutUser,
});

export default RootReducer