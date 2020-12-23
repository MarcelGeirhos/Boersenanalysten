import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

const middleware = applyMiddleware(thunk);
const store = createStore(RootReducer, middleware);

export default store;