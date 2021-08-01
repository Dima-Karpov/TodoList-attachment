import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { todolistAPI, UpdateTaskModelType } from '../../api/todolist-api';

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

export const GetTasks = () => {
    const todolistId = 'a191b60f-1c75-42d3-80b8-2c9b49def38b';
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const DeleteTask = () => {
    const todolistId = '99dc65fa-91d0-42e5-99e4-206e8cd46663';
    const taskId = '7afbca16-4e9d-4c80-857d-2d8fc1d22600';
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const CreateTask = () => {
    const todolistId = '99dc65fa-91d0-42e5-99e4-206e8cd46663';
    const taskTitle = 'HELLO !!!';
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};
export const UpdateTask = () => {
    const todolistId = '6c10f74a-a09c-449d-855d-a775db0bd959';
    const taskId = '7afbca16-4e9d-4c80-857d-2d8fc1d22600';

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        
        let model: UpdateTaskModelType = {
            title: 'string',
            description: 'string',
            status: 1,
            priority: 2,
            startDate: 'string',
            deadline: 'string',
        }

    todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
};

