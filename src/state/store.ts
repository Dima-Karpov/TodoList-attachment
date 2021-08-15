import { combineReducers, createStore, applyMiddleware } from "redux";
import { tasksReducer } from "./task-reducer";
import { todoListReduser } from "./TodoList-reducer";
import thunk from 'redux-thunk';
import { appReducer } from "./app-reducer";
import { authReducer } from "../components/features/Login/auth-reducer";

const rootReduser = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReduser,
    app: appReducer,
    auth: authReducer,
});

// type AppRootStateType = {
//     todoLists: Array<TodoListType>
//     tasks: TaskStateType
// }

export const store = createStore(rootReduser, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReduser>

//@ts-ignore
window.store = store;