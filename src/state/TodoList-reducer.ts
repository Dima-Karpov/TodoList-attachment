import React from 'react'
import { v1 } from 'uuid';
import { todolistAPI, TodolistType } from './../api/todolist-api';
import { Dispatch } from 'redux';

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
    title: string
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

                        
                            
                        
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
};
export const todoListID_1 = v1();
export const todoListID_2 = v1();

const initialState: Array<TodoListDomainType> = []

// [
//     {
//         id: todoListID_1,
//         title: 'What to learn',
//         filter: 'all'
//     },
//     {
//         id: todoListID_2,
//         title: 'What to buy',
//         filter: 'all'
//     },
// ];


export const todoListReduser = (todoLists: Array<TodoListDomainType> = initialState, action: ActionUnionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case remove_todoList:
            return [...todoLists].filter(tl => tl.id !== action.todoListID)
        case add_todoList:{
            return [{
                id: action.todoListID,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...todoLists]
        }
        case change_todoList_title:
            return [...todoLists].map(tl => tl.id === action.todoListID ? { ...tl, title: action.newTitle } : tl)
        case change_todoList_filter:
            return [...todoLists].map(tl => tl.id === action.todoListID ? { ...tl, filter: action.filter } : tl)
        case set_todoList:
            return action.todoLists.map((tl) => {
                return {...tl, filter: 'all'}
            })
        default:
            return todoLists
    }
};

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return { type: remove_todoList, todoListID }
};
export const addTodoListAC = (title: string): AddTodoListAT => {
    return { type: add_todoList, title, todoListID: v1() }
};
export const changeTodoListTitleAC = (todoListID: string, newTitle: string): ChangeTodoListTitleAT => {
    return { type: change_todoList_title, todoListID, newTitle }
};
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return { type: change_todoList_filter, todoListID, filter }
};
export const setTodoListAC = (todoLists: Array<TodolistType>): SetTodoListAT => {
    return {type: set_todoList, todoLists}
};

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodos()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
        })
    } 
}