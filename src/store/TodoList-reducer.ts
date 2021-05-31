import React from 'react'
import { v1 } from 'uuid';
import { FilterValueTpe, TodoListType } from '../App'

export const remove_todoList = 'REMOVE-TODOLIST';
export const add_todoList = 'ADD-TODOLIST';
export const change_todoList_title = 'CHANGE-TODOLIST-TITLE';
export const change_todoList_filter = 'CHANGE-TODOLIST-FILTER';

export type RemoveTodoListAT = {
    type: typeof remove_todoList
    todoListID: string
}
export type AddTodoListAT = {
    type: typeof add_todoList
    newTitle: string
    todoListID: string
}
type ChangeTodoListTitleAT = {
    type: typeof change_todoList_title
    todoListID: string
    newTitle: string
}
type ChangeTodoListFilterAT = {
    type: typeof change_todoList_filter
    todoListID: string
    filter: FilterValueTpe
}

export type ActionUnionType = RemoveTodoListAT
                            | AddTodoListAT
                            | ChangeTodoListTitleAT
                            | ChangeTodoListFilterAT

export const todoListReduser = (todoList: Array<TodoListType>, action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case remove_todoList:
            return [...todoList].filter(tl => tl.id !== action.todoListID)
        case add_todoList:
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.newTitle,
                filter: 'all'
            };
            return [...todoList, newTodoList]
        case change_todoList_title:
            return [...todoList].map(tl => tl.id === action.todoListID ? { ...tl, title: action.newTitle } : tl)
        case change_todoList_filter:
            return [...todoList].map(tl => tl.id === action.todoListID ? { ...tl, filter: action.filter } : tl)
        default:
            return todoList
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return { type: remove_todoList, todoListID }
}

export const addTodoListAC = (newTitle: string): AddTodoListAT => {
    return { type: add_todoList, newTitle, todoListID: v1() }
}
export const changeTodoListTitleAC = (todoListID: string, newTitle: string): ChangeTodoListTitleAT => {
    return { type: change_todoList_title, todoListID, newTitle }
}
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValueTpe): ChangeTodoListFilterAT => {
    return { type: change_todoList_filter, todoListID, filter }
}