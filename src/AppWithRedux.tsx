import React, { useCallback } from 'react';
import { AddItemFrom } from './AddItemFrom';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Grid, Paper } from '@material-ui/core';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, InitialStateTaskType, removeTodoListAC } from './state/TodoList-reducer';
import { removeTasksAC, addTaskAC, changeTaskStatusAC, chageTaskTitleAC, InitialStateType } from './state/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilterValueTpe = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueTpe
};
export type TaskStateType = {
    [key: string]: TaskType[]
};

export function AppWithRedux() {

    const tasks = useSelector<AppRootStateType, InitialStateType>(state => state.tasks);
    const todoLists = useSelector<AppRootStateType, InitialStateTaskType>(state => state.todoLists);
    const dispatch = useDispatch();

    const removeTasks = useCallback( (id: string, todoListID: string) => {
        dispatch(removeTasksAC(id, todoListID));
    }, [dispatch]);

    const addTask = useCallback( (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID));
    }, [dispatch]);

    const changeStatus = useCallback( (id: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListID))
    }, [dispatch]);
    const changeTaskTitle = useCallback( (id: string, newTitle: string, todoListID: string) => {
        dispatch(chageTaskTitleAC(id, newTitle, todoListID))
    }, [dispatch]);

    const removeTodoList = useCallback( (todoListID: string) => {
        const action = removeTodoListAC(todoListID);
        dispatch(action);
    }, [dispatch]);
    const changeFilter = useCallback( (todoListID: string, value: FilterValueTpe) => {
        const action = changeTodoListFilterAC(todoListID, value);
        dispatch(action);
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) =>  {
        const action = changeTodoListTitleAC(todoListID, newTitle);
        dispatch(action);
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{ padding: '10px' }}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{ padding: '20px 0px' }}>
                    <AddItemFrom addItem={addTodoList} />
                </Grid>
                <Grid container spacing={7}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

