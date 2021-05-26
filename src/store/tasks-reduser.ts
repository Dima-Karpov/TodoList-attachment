
import { TabUnselectedSharp } from '@material-ui/icons';
import React from 'react'
import { v1 } from 'uuid';
import { TaskStateType} from '../App'
import { TaskType } from '../TodoList';
import { AddTodoLilstAT, add_todoList, remove_todoList, RemoveTodoListAT } from './TodoList-reducer';

export const remove_tasks = 'REMOVE-TASKS';
export const add_task = 'ADD-TASK';
export const change_task_title = 'CHANGE-TASK-TITLE'
export const change_status = 'CHANGE-STATUS'

type RemoveTaskskAT = {
   type: 'REMOVE-TASKS'
   id: string
   todoListID: string

}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
type ChanngeStatusAT = {
   type: 'CHANGE-STATUS'
   id: string
   isDone: boolean
   todoListID: string
};
type ChanngeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    newTitle: string
    todoListID: string
}

export type ActionUnionType = RemoveTaskskAT | AddTaskAT | ChanngeTaskTitleAT | ChanngeStatusAT | AddTodoLilstAT | RemoveTodoListAT


export const tasksReducer = (tasks: TaskStateType, action: ActionUnionType): TaskStateType => {
    switch (action.type) {
        case remove_tasks :
            return {...tasks, 
                [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.id)
            }
        case add_task :
            const _id = v1();
            const newTask: TaskType  = {
                id: _id,
                title: action.title,
                isDone: false
            }
            return { ...tasks, 
                [action.todoListID]: [newTask, ...tasks[action.todoListID]] }
        case change_status:
            return {...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.id ? { ...t, isDone: action.isDone } : t)}
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
        const copyState = {...tasks}
        delete copyState[action.todoListID]
            return copyState
        default:
            return tasks
    }
}


export const removeTasksAC = (id: string, todoListID: string): RemoveTaskskAT => {
    return { type: remove_tasks, id, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return { type: add_task, title, todoListID }
}
export const changeStatusAC = (id: string, isDone: boolean, todoListID: string): ChanngeStatusAT => {
    return { type: change_status, id, isDone, todoListID}
}
export const changeTaskTitleAC = (id: string, newTitle: string, todoListID: string): ChanngeTaskTitleAT => {
    return { type: change_task_title, id, newTitle, todoListID }
}