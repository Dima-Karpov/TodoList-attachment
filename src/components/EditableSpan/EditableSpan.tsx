import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { RequestStatusType } from '../../state/app-reducer';

export type EditableSpanPropsType = {
    title: string
    changeTitle: (value: string) => void
    entityStatus?: RequestStatusType

};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onEditMode = () => setEditMode(true);
    const OffEditMode = () => {
        setEditMode(false);
        props.changeTitle(newTaskTitle)
        // setNewTaskTitle('') нужно подумать следует ли так делать
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        editMode ?
            <TextField
                value={newTaskTitle}
                onBlur={OffEditMode}
                autoFocus
                onChange={onChangeTitle}
                disabled={props.entityStatus === 'loading'}
            /> :
            <span
                onDoubleClick={onEditMode}
            >
                {props.title}</span>
    )
});