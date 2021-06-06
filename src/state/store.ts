import { combineReducers, createStore } from "redux";
import { TaskStateType, TodoListType } from "../App";
import { tasksReducer } from "./task-reducer";
import { todoListReduser } from "./TodoList-reducer";

const rootReduser = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReduser,
});

// type AppRootState = {
//     todoLists: Array<TodoListType>
//     tasks: TaskStateType
// }

export const store = createStore(rootReduser);

export type AppRootStateType = ReturnType<typeof rootReduser>

//@ts-ignore
window.store = store;