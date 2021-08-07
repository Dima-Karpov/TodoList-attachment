import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from '../../../EditableSpan/EditableSpan';
import { TaskStatuses, TaskType } from '../../../../api/todolist-api';
import { RequestStatusType } from '../../../../state/app-reducer';

export type TaskPropsType = {
    task: TaskType
    todoListID: string
    
    changeTaskStatus: (todoListID: string,id: string, status: TaskStatuses) => void
    removeTasks: (id: string, todoListID: string) => void
    changeTaskTitle: (todoListID: string, id: string, newTitle: string) => void

    entityStatus: RequestStatusType
};

export const Task = React.memo((props: TaskPropsType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todoListID, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.task.id]);

    const removeTask = useCallback(() => props.removeTasks(props.task.id, props.todoListID),
        [props.task.id, props.todoListID, props.removeTasks]);
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(
            props.todoListID,
            props.task.id,
            newTitle,
        )
    }, [props.changeTaskTitle, props.task.id, props.todoListID]);

    return (
        <div
            key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
        >
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />

            <EditableSpan
                title={props.task.title}
                changeTitle={onChangeTaskTitle}
            />
            <IconButton onClick={removeTask} size="small" disabled={props.entityStatus === 'loading'}>
                <DeleteIcon />
            </IconButton>


        </div>
    )
});