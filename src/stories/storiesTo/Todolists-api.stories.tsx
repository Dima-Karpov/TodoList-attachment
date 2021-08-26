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

export const GetTask = () => {
    const [todolistId, setTodolistId] = useState<string>('');
    const [state, setState] = useState<any>(null)

    const getCurrentTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    };
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <button onClick={getCurrentTasks}>Get task</button>
        </div>
    </div>
};
export const DeletTask = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deletСurrentЕask = () => {
        todolistAPI.deletTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
            .catch((e) => alert(e))
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <input placeholder={'taskId'} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
            <button onClick={deletСurrentЕask}>Delet task</button>
        </div>
    </div>
};
export const CreateTask = () => {

    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitel] = useState<string>('');
    const [state, setState] = useState<any>(null);

    const addNewTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
            .catch((e) => alert(e))
    };

    return <div> {JSON.stringify(state)}

        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <input placeholder={'Name task'} value={title} onChange={(e) => { setTitel(e.currentTarget.value) }} />
            <button onClick={addNewTask}>Create task</button>
        </div>

    </div>
};
export const UpdateTask = () => {

    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [state, setState] = useState<any>(null);

    let data: UpdateTaskModelType = {
        title: 'I upDATE Taks',
        description: 'follow',
        status: 1,
        priority: 1,
        startDate: '0',
        deadline: '0',
    }

    const updatingСurrentЕask = () => {
        todolistAPI.updateTask(todolistId, taskId, data)
            .then(res => {
                setState(res.data)
            })
            .catch((e) => alert(e))
    };

    return <div> {JSON.stringify(state)}

        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <input placeholder={'taskId'} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
            <button onClick={updatingСurrentЕask}>Create task</button>
        </div>

    </div>
};

