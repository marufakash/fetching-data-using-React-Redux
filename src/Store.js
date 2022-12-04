// store
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { todosReducer } from './Services/reducer/reducer';

const store = createStore(todosReducer, applyMiddleware(thunk));

export default store;