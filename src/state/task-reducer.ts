import React from 'react'
import {
    AddTodoListAT, add_todoList, RemoveTodoListAT, SetTodoListAT,
    remove_todoList, set_todoList
} from './TodoList-reducer';
import { Dispatch } from 'redux';
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from '../api/todolist-api';
import { TaskStateType } from '../AppWithRedux';
import { AppRootStateType } from './store';

const remove_tasks = 'REMOVE-TASKS';
const add_task = 'ADD-TASK';
const update_task = 'UPDATE-TASK';
const change_task_title = 'CHANGE-TASK-TITLE';
const set_tasks = 'SET-TASKS';

type RemoveTasksAT = {
    type: typeof remove_tasks
    id: string
    todoListID: string
};
type AddTaskAT = {
    type: typeof add_task
    task: TaskType
};
type ChangeTaskStatusAT = {
    type: typeof update_task
    id: string
    model: UpdateDomainTaskModelType
    todoListID: string
}
type ChangeTaskTilteAT = {
    type: typeof change_task_title
    id: string
    title: string
    todoListID: string
}
type SetTasksAT = {
    type: typeof set_tasks
    tasks: Array<TaskType>
    todoListID: string
}

export type ActionUnionType = RemoveTasksAT
    | AddTaskAT
    | ChangeTaskTilteAT
    | ChangeTaskStatusAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | SetTasksAT


const initialState: TaskStateType = {};


export const tasksReducer = (state: TaskStateType = initialState, action: ActionUnionType): TaskStateType => {
    switch (action.type) {
        case remove_tasks:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.id)
            }
        case add_task: {
            const stateCopy = { ...state }
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy;
        }
        case update_task:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.id ? { ...t, ...action.model } : t)
            }
        case change_task_title:
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
        case set_tasks: {
            const stateCopy = { ...state }
            stateCopy[action.todoListID] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
};

export const removeTasksAC = (id: string, todoListID: string): RemoveTasksAT => {
    return { type: remove_tasks, id, todoListID }
};
export const addTaskAC = (task: TaskType): AddTaskAT => {
    return { type: add_task, task }
};
export const updateTaskAC = (todoListID: string, id: string, model: UpdateDomainTaskModelType): ChangeTaskStatusAT => {
    return { type: update_task, todoListID, id, model }
};

export const chageTaskTitleAC = (id: string, todoListID: string, title: string): ChangeTaskTilteAT => {
    return { type: change_task_title, id, todoListID, title }
};

export const setTasksAC = (tasks: Array<TaskType>, todoListID: string): SetTasksAT => {
    return { type: set_tasks, tasks, todoListID }
};
export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todoListID)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(setTasksAC(tasks, todoListID))
            })
    }
};
export const removeTaskTC = (taskId: string, todoListID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(taskId, todoListID)
            .then((res) => {
                dispatch(removeTasksAC(taskId, todoListID))
            })
    }
};
export const addTaskTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todoListID, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
};

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};


export const updateTaskTC = (todoListID: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

        todolistAPI.updateTask(todoListID, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(todoListID, taskId, domainModel))
            })
    }
};



