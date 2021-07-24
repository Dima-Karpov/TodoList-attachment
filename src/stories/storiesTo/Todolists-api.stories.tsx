import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../../api/todolist-api';

export default {
    title: 'API-TODOLIST'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data)
            })

    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'newTodolist';
        todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
    const todolistId = '38135e80-d692-4671-a539-d2708845a5cf';
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
    const todolistId = '99dc65fa-91d0-42e5-99e4-206e8cd46663';
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'React>>>>>> + JavaScript + Redux')
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};

