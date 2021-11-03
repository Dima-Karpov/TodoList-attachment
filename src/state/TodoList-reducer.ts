import { todolistAPI, TodolistType } from './../api/todolist-api';
import { Dispatch } from 'redux';
import { SetErrorAT, setStatus, SetStatusAT, RequestStatusType } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError, hendleServerAppError } from '../utils/error-utils';
import { fetchTasksTC } from './task-reducer';

export const remove_todoList = 'REMOVE-TODOLIST';
export const add_todoList = 'ADD-TODOLIST';
export const change_todoList_title = 'CHANGE-TODOLIST-TITLE';
export const change_todoList_filter = 'CHANGE-TODOLIST-FILTER';
export const set_todoList = 'SET-TODOLIS';
export const change_todolist_entity_status = 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS';

export type RemoveTodoListAT = {
    type: typeof remove_todoList
    todoListId: string
}
export type AddTodoListAT = {
    type: typeof add_todoList
    todoList: TodolistType
}
type ChangeTodoListTitleAT = {
    type: typeof change_todoList_title
    todoListId: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: typeof change_todoList_filter
    todoListId: string
    filter: FilterValuesType
}
export type SetTodoListAT = {
    type: typeof set_todoList
    todoLists: Array<TodolistType>
}
export type ClearDeletType = ReturnType<typeof clearDeletAC>

type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type ActionUnionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodoListAT
    | SetStatusAT
    | SetErrorAT
    | ChangeTodolistEntityStatusAT
    | ClearDeletType

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};

type ThunkDispatch = Dispatch<ActionUnionType>

const initialState: Array<TodoListDomainType> = []

export const todoListReduser = (todoLists: Array<TodoListDomainType> = initialState, action: ActionUnionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case remove_todoList:
            return [...todoLists].filter(tl => tl.id !== action.todoListId)
        case add_todoList: {
            return [{ ...action.todoList, filter: 'all', entityStatus: 'idle' }, ...todoLists]
        }
        case change_todoList_title:
            return [...todoLists].map(tl => tl.id === action.todoListId ? { ...tl, title: action.title } : tl)
        case change_todoList_filter:
            return [...todoLists].map(tl => tl.id === action.todoListId ? { ...tl, filter: action.filter } : tl)
        case set_todoList:
            return action.todoLists.map((tl) => {
                return { ...tl, filter: 'all', entityStatus: 'idle' }
            })
        case change_todolist_entity_status:
            return [...todoLists].map(tl => tl.id === action.todoListId ? { ...tl, entityStatus: action.entityStatus } : tl)
        case 'TODOLIST/CLEAR-DELETE':
            return [];
        default:
            return todoLists
    }
};

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return { type: remove_todoList, todoListId }
};
export const addTodoListAC = (todoList: TodolistType): AddTodoListAT => {
    return { type: add_todoList, todoList }
};
export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleAT => {
    return { type: change_todoList_title, todoListId, title }
};
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return { type: change_todoList_filter, todoListId, filter }
};
export const setTodoListAC = (todoLists: Array<TodolistType>): SetTodoListAT => {
    return { type: set_todoList, todoLists }
};
export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) =>
    ({ type: change_todolist_entity_status, todoListId, entityStatus } as const)
export const clearDeletAC = () => ({ type: 'TODOLIST/CLEAR-DELETE' } as const)

export const fetchTodoListsTC = () => (dispatch: ThunkDispatch | any) => {
    dispatch(setStatus('loading'))
    todolistAPI.getTodos()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
            dispatch(setStatus('succeeded'))
            return res.data
        })
        .then(todolist => {
            todolist.forEach(tl => {
                dispatch(fetchTasksTC(tl.id))
            })
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};
export const removeTodolistsTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatus('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    todolistAPI.deleteTodo(todoListId)
        .then((res) => {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setStatus('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};
export const addTodolistsTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setStatus('succeeded'))
            } else {
                hendleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};
export const changeTodoListTitleTC = (todoListId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.updateTodolist(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListId, title))
                dispatch(setStatus('succeeded'))
            } else {
                hendleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};

