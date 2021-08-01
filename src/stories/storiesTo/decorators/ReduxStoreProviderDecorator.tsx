import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';
import { tasksReducer } from '../../../state/task-reducer';

import { todoListReduser } from '../../../state/TodoList-reducer';

type TaskType = {
    id: string
    title: string
    isDone: boolean
};
type FilterValueTpe = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilterValueTpe
};

type TaskStateType = {
    [key: string]: TaskType[]
};

type AppRootStateType = {
    todoLists: Array<TodoListType>
    tasks: TaskStateType
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReduser
 })
 
 const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
 };
//@ts-ignore
 export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
 
 export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
    );