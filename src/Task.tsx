import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './TodoList';

type TaskPropsType = {
    task: TaskType
    todoListID: string
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTasks: (id: string, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
};

export const Task = React.memo((props: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id,
            e.currentTarget.checked,
            props.todoListID)
    };
    const removeTask = () => props.removeTasks(props.task.id, props.todoListID);
    
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(
            props.task.id,
            newTitle,
            props.todoListID
        )
    }, [props.changeTaskTitle, props.task.id, props.todoListID]);

    return (
        <li
            key={props.task.id}
            className={props.task.isDone ? 'is-done' : ''}
        >
            <Checkbox
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />

            <EditableSpan
                title={props.task.title}
                changeTitle={onChangeTaskTitle}
            />
            {/* <button onClick={removeTask}>del</button> */}
            <IconButton onClick={removeTask} size="small" >
                <DeleteIcon  />
            </IconButton>


        </li>
    )
});