import { v1 } from "uuid";
import { FilterValueTpe, TodoListType } from "../App"

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    newTitle: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListID: string
    filter: FilterValueTpe

}

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionUnionType): Array<TodoListType> => {
    switch(action.type){
        case 'REMOVE-TODOLIST': 
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE': 
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle}: tl)
        case 'CHANGE-TODOLIST-FILTER': 
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter}: tl)
        default: 
            return todoLists 
    }
}


export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID: todoListID}
}
export const AddTodoListAC = ( title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST',  title: title}
}
export const ChangeTodoListTitleAC = (todoListID: string, newTitle: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID: todoListID,  newTitle: newTitle}
}
export const ChangeTodoListFilterAC = (filter: FilterValueTpe, todoListID: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER',  filter: filter,  todoListID: todoListID}
}

