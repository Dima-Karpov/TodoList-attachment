import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddItemFrom } from './AddItemFrom';

import { Checkbox, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from './EditableSpan';
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
    changeFilter: (todoListID: string, value: FilterValueTpe) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
}

export function TodoList(props: PropsType) {
    const tasks = props.tasks.map(t => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id,
                e.currentTarget.checked,
                props.todoListID)
        };
        const removeTask = () => props.removeTasks(t.id, props.todoListID);
        
        const onChangeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(
                t.id,
                newTitle,
                props.todoListID
            )
        };

        return (
            <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}
            >
                <Checkbox
                    checked={t.isDone}
                    onChange={onChangeHandler}
                />

                <EditableSpan
                    title={t.title}
                    changeTitle={onChangeTaskTitle}
                />
                {/* <button onClick={removeTask}>del</button> */}
                <IconButton onClick={removeTask} size="small" >
                    <DeleteIcon  />
                </IconButton>
 
 
            </li>
        )
    });

    const onClickAllFilter = () => { props.changeFilter(props.todoListID, 'all') };
    const onClickActiveFilter = () => { props.changeFilter(props.todoListID, 'active') };
    const onClickCompletedFilter = () => { props.changeFilter(props.todoListID, 'completed') };

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    };
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    };

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    };

    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </h3>
            <div>
                <AddItemFrom addItem={addTask} />
            </div>
            <ul style={{listStyle: 'none', paddingLeft:'0px'}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onClickAllFilter}>
                    All</Button>
                <Button
                    style={{ marginLeft: "5px"}}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onClickActiveFilter}
                    >Active</Button>
                <Button
                    style={{ marginLeft: "5px" }}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onClickCompletedFilter}
                    >Completed</Button>
            </div>
        </div>
    )
}