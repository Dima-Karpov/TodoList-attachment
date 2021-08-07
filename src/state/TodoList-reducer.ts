import React from 'react'
import { todolistAPI, TodolistType } from './../api/todolist-api';
import { Dispatch } from 'redux';
import { setStatus, SetStatusAT } from './app-reducer';

export const remove_todoList = 'REMOVE-TODOLIST';
export const add_todoList = 'ADD-TODOLIST';
export const change_todoList_title = 'CHANGE-TODOLIST-TITLE';
export const change_todoList_filter = 'CHANGE-TODOLIST-FILTER';
export const set_todoList = 'SET-TODOLIS';

export type RemoveTodoListAT = {
    type: typeof remove_todoList
    todoListID: string
}
export type AddTodoListAT = {
    type: typeof add_todoList
    todoList: TodolistType
}
type ChangeTodoListTitleAT = {
    type: typeof change_todoList_title
    todoListID: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: typeof change_todoList_filter
    todoListID: string
    filter: FilterValuesType
}
export type SetTodoListAT = {
    type: typeof set_todoList
    todoLists: Array<TodolistType>
}

export type ActionUnionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodoListAT
    | SetStatusAT




export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
};

const initialState: Array<TodoListDomainType> = []

export const todoListReduser = (todoLists: Array<TodoListDomainType> = initialState, action: ActionUnionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case remove_todoList:
            return [...todoLists].filter(tl => tl.id !== action.todoListID)
        case add_todoList: {
            return [{ ...action.todoList, filter: 'all' }, ...todoLists]
        }
        case change_todoList_title:
            return [...todoLists].map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
        case change_todoList_filter:
            return [...todoLists].map(tl => tl.id === action.todoListID ? { ...tl, filter: action.filter } : tl)
        case set_todoList:
            return action.todoLists.map((tl) => {
                return { ...tl, filter: 'all' }
            })
        default:
            return todoLists
    }
};

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return { type: remove_todoList, todoListID }
};
export const addTodoListAC = (todoList: TodolistType): AddTodoListAT => {
    return { type: add_todoList, todoList }
};
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
    return { type: change_todoList_title, todoListID, title }
};
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return { type: change_todoList_filter, todoListID, filter }
};
export const setTodoListAC = (todoLists: Array<TodolistType>): SetTodoListAT => {
    return { type: set_todoList, todoLists }
};

export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.getTodos()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
            dispatch(setStatus('succeeded'))
        })
}

export const removeTodolistsTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.deleteTodo(todoListID)
        .then((res) => {
            dispatch(removeTodoListAC(todoListID))
            dispatch(setStatus('succeeded'))
        })
}

export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.createTodo(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setStatus('succeeded'))
        })
}
export const changeTodoListTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.updateTodolist(todoListID, title)
        .then((res) => {
            dispatch(changeTodoListTitleAC(todoListID, title))
            dispatch(setStatus('succeeded'))
        })
}