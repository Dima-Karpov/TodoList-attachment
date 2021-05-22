import { TextField } from '@material-ui/core';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (value: string) => void

};

export function EditableSpan(props: EditableSpanPropsType) {

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
            /> :
            <span
                onDoubleClick={onEditMode}
            >
                {props.title}</span>
    )
};