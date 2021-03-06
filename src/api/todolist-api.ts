import axios from 'axios';
import { RequestStatusType } from '../state/app-reducer';

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldError: Array<string>
    data: T
};
export type TodolistType = {
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
    entityStatus: RequestStatusType
};
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
};
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
};


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9e8978ae-0246-4c6d-84c4-bc28bfa5ba72'
    }
});

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', { title })
    },
    deleteTodo(todoListId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todoListId}`, { title })
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deletTask(taskId: string, todoListId: string ) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todoListId: string, title: string  ) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, { title });
    },
    updateTask( todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
};