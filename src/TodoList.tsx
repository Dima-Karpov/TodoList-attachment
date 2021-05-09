import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddItemFrom } from './AddItemFrom';
import { FilterValueTpe } from './App';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueTpe
    todoListsID: string


    removeTasks: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValueTpe, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const tasks = props.tasks.map(t => {
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListsID)
        }
        const removeTask = () => props.removeTasks(t.id, props.todoListsID);

        const onChangeTitleHandler = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListsID)
        }
        return (
            <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}
            >
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChangeStatusHandler}
                />
                <EditableSpan
                    title={t.title}
                    changeTitle={onChangeTitleHandler}
                />
                <button onClick={removeTask}>del</button>
            </li>
        )
    });


    const onClickAllFilter = () => { props.changeFilter('all', props.todoListsID) };
    const onClickActiveFilter = () => { props.changeFilter('active', props.todoListsID) };
    const onClickCompletedFilter = () => { props.changeFilter('completed', props.todoListsID) };

    const removeTodoList = () => {
        props.removeTodoList(props.todoListsID)
    };

    const addTask = (title: string) => {
        props.addTask(title, props.todoListsID)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListsID, newTitle)
    };

    return (
        <div>

            <h3>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodolistTitle}
                />
                <button onClick={removeTodoList}>x</button>

            </h3>

            <AddItemFrom addItem={addTask} />
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


