import React, { useState } from 'react';
// import { v1 } from 'uuid';
// import { AddItemFrom } from './AddItemFrom';
// import './App.css';
// import { TaskType, TodoList } from './TodoList';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Container, Grid, Paper } from '@material-ui/core';


// export type FilterValueTpe = 'all' | 'active' | 'completed'

// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValueTpe
// };
// export type TaskStateType = {
//     [key: string]: TaskType[]
// };

// function App() {

//     const todoListID_1 = v1();
//     const todoListID_2 = v1();
//     const [todoLists, setTodoLists] = useState<TodoListType[]>(
//         [
//             {
//                 id: todoListID_1,
//                 title: 'What to learn',
//                 filter: 'all'
//             },
//             {
//                 id: todoListID_2,
//                 title: 'What to buy',
//                 filter: 'all'
//             },
//         ]
//     );

//     const [tasks, setTasks] = useState<TaskStateType>(
//         {
//             [todoListID_1]: [
//                 { id: v1(), title: "HTML&CSS", isDone: true },
//                 { id: v1(), title: "JS", isDone: true },
//                 { id: v1(), title: "ReactJS", isDone: false },
//                 { id: v1(), title: "Redax", isDone: true },
//             ],
//             [todoListID_2]: [
//                 { id: v1(), title: "HTML&CSS", isDone: true },
//                 { id: v1(), title: "JS", isDone: true },
//                 { id: v1(), title: "ReactJS", isDone: false },
//                 { id: v1(), title: "Redax", isDone: false },
//             ]
//         }
//     );

//     function removeTasks(id: string, todoListID: string) {
//         tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
//         setTasks({ ...tasks })
//     };

//     function addTask(title: string, todoListID: string) {
//         const newTask = {
//             id: v1(),
//             title: title,
//             isDone: false
//         }
//         setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });
//     };

//     function changeStatus(id: string, isDone: boolean, todoListID: string) {
//         setTasks({
//             ...tasks,
//             [todoListID]: tasks[todoListID].map(t => t.id === id ? { ...t, isDone: isDone } : t)
//         });
//     };
//     function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
//         setTasks({
//             ...tasks,
//             [todoListID]: tasks[todoListID].map(t => t.id === id ? { ...t, title: newTitle } : t)
//         });
//     };

//     function getTasksForTodoList(todoList: TodoListType) {
//         switch (todoList.filter) {
//             case 'completed':
//                 return tasks[todoList.id].filter(t => t.isDone)
//             case 'active':
//                 return tasks[todoList.id].filter(t => t.isDone === false)
//             default:
//                 return tasks[todoList.id]
//         }
//     };

//     function removeTodoList(todoListID: string) {
//         let filterTodoList = todoLists.filter(tl => tl.id !== todoListID)
//         setTodoLists(filterTodoList);
//         delete tasks[todoListID];
//         setTasks({ ...tasks });
//     };
//     function changeFilter(todoListID: string, value: FilterValueTpe) {
//         setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter: value } : tl));
//     };
//     function changeTodoListTitle(todoListID: string, newTitle: string) {
//         setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, title: newTitle } : tl));
//     };
//     function addTodoList(title: string) {
//         const newTodoListID = v1();
//         const newTodoList: TodoListType = {
//             id: newTodoListID,
//             title: title,
//             filter: 'all'
//         };
//         setTodoLists([...todoLists, newTodoList]);
//         setTasks({ ...tasks, [newTodoListID]: [] });
//     };

//     const todoListComponents = todoLists.map(tl => {
//         return (
//             <Grid item key={tl.id}>
//                 <Paper elevation={3} style={{padding: '10px'}}>
//                     <TodoList
//                         todoListID={tl.id}
//                         title={tl.title}
//                         tasks={getTasksForTodoList(tl)}
//                         removeTasks={removeTasks}
//                         changeFilter={changeFilter}
//                         addTask={addTask}
//                         changeTaskStatus={changeStatus}
//                         filter={tl.filter}
//                         removeTodoList={removeTodoList}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodoListTitle={changeTodoListTitle}
//                     />
//                 </Paper>
//             </Grid>
//         );
//     });

//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent:'space-between'}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6">
//                         TodoList
//                 </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container>
//                 <Grid container style={{padding: '20px 0px'}}>
//                     <AddItemFrom addItem={addTodoList} />
//                 </Grid>
//                 <Grid container spacing={7}>
//                     {todoListComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }

// export default App;
