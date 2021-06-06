import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { AddItemFrom } from './AddItemFrom';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Grid, Paper } from '@material-ui/core';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListReduser} from './state/TodoList-reducer';
import { removeTasksAC, tasksReducer, addTaskAC, changeTaskStatusAC, chageTaskTitleAC } from './state/task-reducer';


export type FilterValueTpe = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueTpe
};
export type TaskStateType = {
    [key: string]: TaskType[]
};

export function AppWithReducers() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, dispatchTodoLists] = useReducer(todoListReduser, 
        [
            {
                id: todoListID_1,
                title: 'What to learn',
                filter: 'all'
            },
            {
                id: todoListID_2,
                title: 'What to buy',
                filter: 'all'
            },
        ]
    );

    const [tasks, dispathTasks] = useReducer(tasksReducer, 
        {
            [todoListID_1]: [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS", isDone: true },
                { id: v1(), title: "ReactJS", isDone: false },
                { id: v1(), title: "Redax", isDone: true },
            ],
            [todoListID_2]: [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS", isDone: true },
                { id: v1(), title: "ReactJS", isDone: false },
                { id: v1(), title: "Redax", isDone: false },
            ]
        }
    );

    function removeTasks(id: string, todoListID: string) {
        dispathTasks(removeTasksAC(id, todoListID));
    };

    function addTask(title: string, todoListID: string) {
        dispathTasks(addTaskAC(title, todoListID));
    };

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        dispathTasks(changeTaskStatusAC(id, isDone, todoListID))
    };
    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        dispathTasks(chageTaskTitleAC(id, newTitle, todoListID))
    };

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            case 'active':
                return tasks[todoList.id].filter(t => t.isDone === false)
            default:
                return tasks[todoList.id]
        }
    };

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID);
        dispatchTodoLists(removeTodoListAC(todoListID));
        dispathTasks(action);
    };
    function changeFilter(todoListID: string, value: FilterValueTpe) {
        const action = changeTodoListFilterAC(todoListID, value);
        dispatchTodoLists(action);
    };
    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const action = changeTodoListTitleAC(todoListID, newTitle);
        dispatchTodoLists(action);
    };
    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispathTasks(action);
        dispatchTodoLists(action);

    };

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: '10px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
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
                <Toolbar style={{justifyContent:'space-between'}}>
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
                <Grid container style={{padding: '20px 0px'}}>
                    <AddItemFrom addItem={addTodoList} />
                </Grid>
                <Grid container spacing={7}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

