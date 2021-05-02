import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueTpe } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueTpe
    todoListID: string
    removeTasks: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValueTpe, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(t => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        };
        const removeTask = () => props.removeTasks(t.id, props.todoListID);
        return (
            <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}
            >
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>del</button>
            </li>
        )
    });

    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.todoListID);
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    };

    const onKeyPressAddTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) };

    const onClickAllFilter = () => { props.changeFilter('all', props.todoListID) };
    const onClickActiveFilter = () => { props.changeFilter('active', props.todoListID) };
    const onClickCompletedFilter = () => { props.changeFilter('completed', props.todoListID) };

    const removeTodoList = () => {props.removeTodoList(props.todoListID)}

    return( 
       
    <div >
    
        <h3>{props.title}  <button onClick={removeTodoList}>x</button> </h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTasks}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickAddTask}>+</button>
            {error && <div className='error-messages'>{error}</div>}
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilter}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveFilter}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickCompletedFilter}>Completed</button>
        </div>
    </div>)
}
