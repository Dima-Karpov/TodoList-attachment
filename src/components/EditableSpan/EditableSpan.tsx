import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';

export type EditableSpanPropsType = {
    title: string
    changeTitle: (value: string) => void

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
            /> :
            <span
                onDoubleClick={onEditMode}
            >
                {props.title}</span>
    )
});