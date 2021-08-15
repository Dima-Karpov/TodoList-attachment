import React, { useCallback, useEffect } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import LinearProgress from '@material-ui/core/LinearProgress';
import { RequestStatusType } from '../state/app-reducer';
import { ErrorSnacbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { TodolistsList } from '../components/features/Todolist/TodolistsList';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './../components/features/Login/Login';
import { initializeAppTC } from '../state/app-reducer';



export function AppWithRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch]);

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    };

    return (
        <BrowserRouter>
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

                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistsList />} />
                        <Route path={'/login'} render={() => <Login />} />
                        <Route path={'/404'} render={() => <h1 style={{ fontSize: '50px', textAlign: 'center' }}>404: PAGE NOT FOUND</h1>} />
                        <Redirect from={'*'} to={'/404'} />
                    </Switch>

                </Container>
                <ErrorSnacbar />
            </div>
        </BrowserRouter>
    );
}