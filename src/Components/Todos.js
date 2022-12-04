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