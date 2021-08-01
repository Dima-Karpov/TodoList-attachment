import React, { useCallback, useEffect } from 'react';
import { AddItemFrom } from './AddItemFrom';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';
import { fetchTasksTC } from './state/task-reducer';
import { useDispatch } from 'react-redux';
import { TaskType, TaskStatuses } from './api/todolist-api';
import { FilterValuesType } from './state/TodoList-reducer';



export type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todoListID: string

    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string ) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void

    changeTaskStatus: (id: string, todoListID: string, status: TaskStatuses) => void
    removeTasks: (id: string, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
}

export const TodoList = React.memo( (props: PropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListID))
    }, [])

    const getTasksForTodoList = () => {
        switch (props.filter) {
            case 'completed':
                return props.tasks.filter(t => t.status === TaskStatuses.New)
            case 'active':
                return props.tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return props.tasks
        }
    };

    let newTasks = getTasksForTodoList();
    
    const tasks = newTasks.map(t => <Task
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

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoListID)
    }, [props.removeTodoList, props.todoListID]);

    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListID, title )
    }, [props.addTask, props.todoListID]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    }, [props.changeTodoListTitle, props.todoListID]);

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

