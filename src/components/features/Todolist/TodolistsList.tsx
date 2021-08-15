import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskStatuses } from '../../../api/todolist-api';
import { AppRootStateType } from '../../../state/store';
import {
    removeTaskTC, addTaskTC, TaskStateType,
    updateTaskTC
} from '../../../state/task-reducer';
import {
    addTodolistsTC, changeTodoListFilterAC, changeTodoListTitleTC,
    fetchTodoListsTC, FilterValuesType, removeTodolistsTC,
    TodoListDomainType
} from '../../../state/TodoList-reducer';
import { Grid, Paper } from '@material-ui/core';
import { TodoList } from '../Todolist/TodoList';
import { AddItemFrom } from '../../AddItemForm/AddItemFrom'
import { Redirect } from 'react-router-dom';



export const TodolistsList: React.FC = React.memo(() => {

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch]);

    const removeTasks = useCallback((id: string, todoListID: string) => {
        dispatch(removeTaskTC(id, todoListID));
    }, [dispatch]);

    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(addTaskTC(todoListID, title));
    }, [dispatch]);

    const changeStatus = useCallback((todoListID: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListID, id, { status }))
    }, [dispatch]);

    const changeTaskTitle = useCallback((todoListID: string, id: string, newTitle: string) => {
        dispatch(updateTaskTC(todoListID, id, { title: newTitle }))
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodolistsTC(todoListID);
        dispatch(action);
    }, [dispatch]);
    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListID, value);
        dispatch(action);
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodoListTitleTC(todoListID, newTitle));
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, [dispatch]);


    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <>
        <Grid container style={{ padding: '20px' }}>
            <AddItemFrom addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{ padding: '10px' }}>
                            <TodoList
                                todoListID={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTasks={removeTasks}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                entityStatus={tl.entityStatus}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
})
