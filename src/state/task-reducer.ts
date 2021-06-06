import React from 'react'
import { v1 } from 'uuid';
import { TaskStateType } from '../App'
import { TaskType } from '../TodoList';
import { AddTodoListAT, add_todoList, RemoveTodoListAT, remove_todoList, todoListID_1, todoListID_2 } from './TodoList-reducer';

const remove_tasks = 'REMOVE-TASKS';
const add_task = 'ADD-TASK';
const change_task_status = 'CHANGE-TASK-STATUS';
const change_task_title = 'CHANGE-TASK-TITLE';

type RemoveTasksAT = {
    type: typeof remove_tasks
    id: string
    todoListID: string
};
type AddTaskAT = {
    type: typeof add_task
    newTitle: string
    todoListID: string
};
type ChangeTaskStatusAT = {
    type: typeof change_task_status
    id: string
    isDone: boolean
    todoListID: string
}
type ChangeTaskTilteAT = {
    type: typeof change_task_title
    id: string
    newTitle: string
    todoListID: string
}
export type ActionUnionType = RemoveTasksAT
                            | AddTaskAT
                            | ChangeTaskTilteAT
                            | ChangeTaskStatusAT
                            | AddTodoListAT
                            | RemoveTodoListAT

                            
const initialState: TaskStateType = {
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
};

export type InitialStateType = typeof initialState

export const tasksReducer = (tasks: InitialStateType = initialState, action: ActionUnionType): InitialStateType => {
    switch (action.type) {
        case remove_tasks:
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.id)
            }
        case add_task:
            const _id = v1();
            const newTask: TaskType = {
                id: _id,
                title: action.newTitle,
                isDone: false
            }
            return {
                ...tasks,
                [action.todoListID]: [newTask, ...tasks[action.todoListID]]
            }
        case change_task_status:
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.id ? { ...t, isDone: action.isDone } : t)
            }
        case change_task_title:
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.id ? { ...t, title: action.newTitle } : t)
            }
        case add_todoList:
            return {
                ...tasks,
                [action.todoListID]: []
            }
        case remove_todoList:
            const copyTasks = { ...tasks }
            delete copyTasks[action.todoListID]
            return copyTasks
        default:
            return tasks
    }
};

export const removeTasksAC = (id: string, todoListID: string): RemoveTasksAT => {
    return { type: remove_tasks, id, todoListID }
};
export const addTaskAC = (newTitle: string, todoListID: string): AddTaskAT => {
    return { type: add_task, newTitle, todoListID }
};
export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return { type: change_task_status, id, isDone, todoListID }
};
export const chageTaskTitleAC = (id: string, newTitle: string, todoListID: string): ChangeTaskTilteAT => {
    return { type: change_task_title, id, newTitle, todoListID }
};