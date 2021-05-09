import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPopsType = {
    title: string
    changeTitle: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPopsType) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onEditMode = () => setEditMode(true);
    const offEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false);
            props.changeTitle(newTaskTitle);
        }
    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };


    return (
        editMode
            ? <input
                value={newTaskTitle}
                autoFocus
                onChange={onChangeTitle}
                onKeyPress={offEditMode}
                

            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}
