import React, { ChangeEvent, useCallback } from 'react';
import { AddItemFrom } from './AddItemFrom';
import { Checkbox, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from './EditableSpan';
import { FilterValueTpe } from './App';
import { Task } from './Task';

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
    changeFilter: (todoListID: string, value: FilterValueTpe) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void

    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTasks: (id: string, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
}

export const TodoList = React.memo( (props: PropsType) => {
    const tasks = props.tasks.map(t => <Task
                                            task={t}
                                            todoListID={props.todoListID}
                                            changeTaskStatus={props.changeTaskStatus}
                                            removeTasks={props.removeTasks}
                                            changeTaskTitle={props.changeTaskTitle}
                                            key={t.id}

    />);

    const onClickAllFilter = useCallback( () => { props.changeFilter(props.todoListID, 'all') }, [props.changeFilter]);
    const onClickActiveFilter = useCallback( () => { props.changeFilter(props.todoListID, 'active') }, [props.changeFilter]);
    const onClickCompletedFilter = useCallback( () => { props.changeFilter(props.todoListID, 'completed') }, [props.changeFilter]);

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    };
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    }, [props.changeTodoListTitle]);

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
});

