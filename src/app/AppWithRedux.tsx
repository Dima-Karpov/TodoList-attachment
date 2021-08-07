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



export function AppWithRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, []);

    const removeTasks = useCallback((id: string, todoListID: string) => {
        dispatch(removeTaskTC(id, todoListID));
    }, [dispatch]);

    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(addTaskTC(todoListID, title));
    }, [dispatch]);

    const changeStatus = useCallback((todoListID: string, id: string,  status: TaskStatuses ) => {
        dispatch(updateTaskTC(todoListID, id, {status}))
    }, [dispatch]);

    const changeTaskTitle = useCallback((todoListID: string,id: string,  newTitle: string) => {
        dispatch(updateTaskTC(todoListID, id, {title: newTitle}))
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
                        entityStatus={tl.entityStatus}
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnacbar/>
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