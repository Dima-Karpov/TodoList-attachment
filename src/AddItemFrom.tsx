import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type AddItemPropsType = {
    addItem: (title: string) => void
};

export function AddItemFrom(props: AddItemPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) };

    const onKeyPressAddTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    };
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    };

    return (
        <div>
            <TextField
                value={newTaskTitle}
                variant={'outlined'}
                label={'Type value'}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTasks}
                error={!!error}
                helperText={error}
                onBlur={() => setError(null)}
            />
            <IconButton onClick={onClickAddTask} color={'primary'} >
                <AddIcon fontSize={'default'} />
            </IconButton>
        </div>
    )
};
