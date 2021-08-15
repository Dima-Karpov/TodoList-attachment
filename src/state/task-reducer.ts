import React from 'react'
import {
    AddTodoListAT, add_todoList, RemoveTodoListAT, SetTodoListAT,
    remove_todoList, set_todoList, ClearDeletType
} from './TodoList-reducer';
import { Dispatch } from 'redux';
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from '../api/todolist-api';
import { AppRootStateType } from './store';
import { setStatus, SetStatusAT, SetErrorAT, RequestStatusType } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError, hendleServerAppError } from '../utils/error-utils';

export type TaskStateType = {
    [key: string]: TaskType[]
};

export type ActionUnionType = ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof chageTaskTitleAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | ReturnType<typeof setTasksAC>
    | SetStatusAT
    | SetErrorAT
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ClearDeletType

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionUnionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK': {
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
            // const stateCopy = { ...state }
            // const newTask = action.task
            // const tasks = stateCopy[newTask.todoListId]
            // const newTasks = [newTask, ...tasks]
            // stateCopy[newTask.todoListId] = newTasks
            // return stateCopy;
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.id ? { ...t, ...action.model } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.id ? { ...t, title: action.title } : t)
            }
        case add_todoList:
            return {
                ...state,
                [action.todoList.id]: []
            }
        case remove_todoList: {
            const copyTasks = { ...state }
            delete copyTasks[action.todoListID]
            return copyTasks
        }
        case set_todoList: {
            const copyState = { ...state }
            action.todoLists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case 'SET-TASKS': {
            const stateCopy = { ...state }
            stateCopy[action.todoListID] = action.tasks
            return stateCopy
        }
        case 'TASK/CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.id ? { ...t, entityStatus: action.entityStatus } : t)
            }
        case 'TODOLIST/CLEAR-DELETE':
            return {}
        default:
            return state
    }
};

export const removeTasksAC = (id: string, todoListID: string) =>
    ({ type: 'REMOVE-TASKS', id, todoListID } as const);
export const addTaskAC = (task: TaskType) =>
    ({ type: 'ADD-TASK', task } as const);
export const updateTaskAC = (todoListID: string, id: string, model: UpdateDomainTaskModelType) =>
    ({ type: 'UPDATE-TASK', todoListID, id, model } as const);
export const chageTaskTitleAC = (id: string, todoListID: string, title: string) =>
    ({ type: 'CHANGE-TASK-TITLE', id, todoListID, title } as const);
export const setTasksAC = (tasks: Array<TaskType>, todoListID: string) =>
    ({ type: 'SET-TASKS', tasks, todoListID } as const);

export const changeTaskEntityStatusAC = (id: string, todoListID: string, entityStatus: RequestStatusType) =>
    ({ type: 'TASK/CHANGE-TASK-ENTITY-STATUS', id, todoListID, entityStatus } as const)

// thunk

export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.getTasks(todoListID)
        .then((res) => {
            const tasks = res.data.items;
            dispatch(setTasksAC(tasks, todoListID))
            dispatch(setStatus('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};
export const removeTaskTC = (taskId: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    dispatch(changeTaskEntityStatusAC(taskId, todoListID, 'loading'))
    todolistAPI.deleteTask(taskId, todoListID)
        .then((res) => {
            dispatch(removeTasksAC(taskId, todoListID))
            dispatch(setStatus('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.createTask(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatus('succeeded'))
            } else {
                hendleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};
export const updateTaskTC = (todoListID: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();

        const task = state.tasks[todoListID].find(t => t.id === taskId);
        if (!task) {
            console.warn('task not found in the state');
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(setStatus('loading'))
        todolistAPI.updateTask(todoListID, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todoListID, taskId, domainModel))
                    dispatch(setStatus('succeeded'))
                } else {
                    hendleServerAppError(dispatch, res.data)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message)
            })
    };



