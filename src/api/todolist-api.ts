import axios from 'axios';
import React from 'react'

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldError: Array<string>
    data: T
};

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
};

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
};

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
};

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
};

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
};


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5507fe8c-2544-4fce-b5cf-435dc4ae94a7'
    }
});

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title: string) {
       return instance.post<CommonResponseType>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
       return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string){
        return instance.post<CommonResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
    },
    updateTask(todolistId: string, taskId: string, model: {}){
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}