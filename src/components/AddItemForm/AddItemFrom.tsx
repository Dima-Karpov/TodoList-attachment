import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { RequestStatusType } from '../../state/app-reducer';

export type AddItemPropsType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
};

export const AddItemFrom: React.FC<AddItemPropsType> = React.memo((props) => {
    const {
        addItem,
        entityStatus,
    } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) };

    const onKeyPressAddTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        };
        if (e.key === 'Enter') {
            onClickAddTask()
        };
    };
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle.trim());
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
                disabled={entityStatus === 'loading'}
            />
            <IconButton
                onClick={onClickAddTask}
                color={'primary'}
                disabled={entityStatus === 'loading'}
            >
                <AddIcon fontSize={'default'} />
            </IconButton>
        </div>
    )
});
