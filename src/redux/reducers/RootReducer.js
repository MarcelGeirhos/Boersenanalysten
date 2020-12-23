import createUser from './AuthReducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    auth: createUser,
});

export default RootReducer