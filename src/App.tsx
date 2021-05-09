import { time } from 'node:console';
import React, { useState } from 'react';
import { stringify, v1 } from 'uuid';
import { AddItemFrom } from './AddItemFrom';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type FilterValueTpe = 'all' | 'completed' | 'active'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueTpe
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>(
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

    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [todoListID_1]: [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS", isDone: true },
                { id: v1(), title: "ReactJS", isDone: false },
                { id: v1(), title: "Redax", isDone: false },
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
        setTasks({ ...tasks })
    };

    function addTask(title: string, todoListID: string) {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });
    };

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === id ? { ...t, isDone: isDone } : t)
        });
    };

    function changeFilter(value: FilterValueTpe, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter: value } : tl));
    };

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    };

    function removeTodoList(todoListID: string) {
        let filterTodoList = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filterTodoList);
        delete tasks[todoListID];
        setTasks({
            ...tasks,
            [todoListID]: []

        });
    };

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            filter: 'all',
            title: title
        };
        setTodoLists([...todoLists, newTodoList]);
        setTasks({
            ...tasks,
            [newTodoListID]: []
        });
    };

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === id ? { ...t, title: newTitle } : t)
        });
    };

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, title: newTitle } : tl));
    };

    const todoListComponents = todoLists.map(tl => {
        return (

            <TodoList
                key={tl.id}
                todoListsID={tl.id}
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
        );
    })



    return (
        <div className="App">
            <AddItemFrom addItem={addTodoList} />
            {todoListComponents}
        </div>
    );
}

export default App;