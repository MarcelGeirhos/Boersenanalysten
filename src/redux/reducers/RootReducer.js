import createUser from './AuthReducer';
import loginUser from './LoginReducer';
import logoutUser from './LogoutReducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    signIn: createUser,
    logIn: loginUser,
    logOut: logoutUser,
});

export default RootReducer