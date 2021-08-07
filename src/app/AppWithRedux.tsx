import React, { useCallback, useEffect } from 'react';
import { AddItemFrom } from '../components/AddItemForm/AddItemFrom';
import './App.css';
import { TodoList } from '../components/features/Todolist/TodoList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Grid, Paper } from '@material-ui/core';
import {
    addTodolistsTC, changeTodoListFilterAC, changeTodoListTitleTC,
    fetchTodoListsTC, TodoListDomainType, removeTodolistsTC,
    FilterValuesType
} from '../state/TodoList-reducer';
import {
    removeTaskTC, updateTaskTC, addTaskTC, TaskStateType } from '../state/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TaskStatuses, TaskType } from '../api/todolist-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import { RequestStatusType } from '../state/app-reducer';
import { ErrorSnacbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { TodolistsList } from '../components/features/Todolist/TodolistsList';



export function AppWithRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

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
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodolistsList />
            </Container>
            <ErrorSnacbar/>
        </div> 
    );
}