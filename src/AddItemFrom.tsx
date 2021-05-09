import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFromPropsType = {
    addItem: (title: string) => void

}

export function AddItemFrom(props: AddItemFromPropsType) {


    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) };
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    };
    const onClickAddItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    };

    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div className='error-messages'>{error}</div>}
        </div>
    );
}