import { title } from 'node:process';
import React from 'react'
import { v1 } from 'uuid';
import { FilterValueTpe, TodoListType } from '../App'

export const remove_todoList = 'REMOVE-TODOLIST';
export const add_todoList = 'ADD-TODOLIST';
export const change_todoList_title = 'CHANGE-TODOLIST-TITLE'
export const change_filter = 'CHANGE-FILTER'

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoLilstAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string

}
type ChanngeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    newTitle: string
}
type ChanngeFilterAT = {
    type: 'CHANGE-FILTER'
    filter: FilterValueTpe
    todoListID: string
};

export type ActionUnionType = RemoveTodoListAT | AddTodoLilstAT | ChanngeTodoListTitleAT | ChanngeFilterAT 


export const todoListReduser = (todoList: Array<TodoListType>, action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case remove_todoList:
            return [...todoList].filter(tl => tl.id !== action.todoListID)
        case add_todoList:
            // const newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: 'all'
            }
            return [...todoList, newTodoList]
        case change_todoList_title:
            return [...todoList].map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle}: tl)
        case change_filter:
            return [...todoList].map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter}: tl)
        default:
            return todoList
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return { type: remove_todoList, todoListID}
}
export const AddTodoListAC = (title: string): AddTodoLilstAT => {
    return { type: add_todoList, title, todoListID: v1()}
}
export const ChanngeTodoListTitleAC = (todoListID: string, newTitle: string): ChanngeTodoListTitleAT => {
    return { type: change_todoList_title, todoListID, newTitle}
}
export const ChanngeFilterAC = (filter: FilterValueTpe, todoListID: string): ChanngeFilterAT => {
    return { type: change_filter, filter, todoListID}
}