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


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5507fe8c-2544-4fce-b5cf-435dc4ae94a7'
    }
});

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5507fe8c-2544-4fce-b5cf-435dc4ae94a7'
    }
};

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
    }
}