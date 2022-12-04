## API calling in react-redux

- step 1: setup project & install packages `npm install redux react-redux redux-thunk axios`

- step 2: define constants-> src/services/constants/constants.js

```
export const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_FAILED = 'GET_TODOS_FAILED';
```

- step 3: create async action creator -> src/services/actions/actions.js

```JavaScript
import axios from 'axios';
import { GET_TODOS_FAILED, GET_TODOS_REQUEST, GET_TODOS_SUCCESS } from '../constants/constants';

export const getAllTodos = () => async (dispatch) => {
    dispatch({type: GET_TODOS_REQUEST})
    try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1/comments")
        dispatch({type:GET_TODOS_SUCCESS, payload: res.data})
    }catch(error){
        dispatch({type: GET_TODOS_FAILED,payload: error.message})
    }
}
```

- step 4: create reducer -> src/services/reducers/reducer.js

```JavaScript
const initialState = {
    isLoading: false,
    todos: [],
    error: null,
}

export const todosReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_TODOS_SUCCESS:
            return {
                isLoading: false,
                todos: action.payload,
                error: null,
            }
        case GET_TODOS_FAILED:
            return {
                isLoading: false,
                todos: [],
                error: action.payload,
            }
        default:
            return state;
    }
}
```

- step 5: create store -> src/Store.js

```JavaScript
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { todosReducer } from './Services/reducer/reducer';

const store = createStore(todosReducer, applyMiddleware(thunk));

export default store;
```

- step 6: provide store -> src/index.js

```JavaScript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from 'react-redux';
import store from "./Store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- step 7: use store -> src/components/Todos.js

```JavaScript
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from '../Services/actions/actions'

const Todos = () => {
    const {isLoading, todos, error} = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTodos());
    },[])

    return (
        <div>
            <h1 className="heading">Data fetch using React-Redux</h1>
            {isLoading && <h3>Data is loading...</h3>}
            {error && <h3>P{error.message}</h3>}
            {todos && todos.map((todo) => {
                const {id, name, email} = todo;
                return (
                    <article key={id} className='card'>
                        <h2>Name : {name}</h2>
                        <h3>Email : {email}</h3>
                    </article>
                )
            })}
        </div>
    )
}

export default Todos;
```