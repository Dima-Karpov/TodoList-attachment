import { TodolistType } from "../api/todolist-api";
import { tasksReducer, TaskStateType } from "./task-reducer"
import { addTodoListAC, TodoListDomainType, todoListReduser } from "./TodoList-reducer";




test('ids should be equlas' , () => {
    const startTasksState: TaskStateType = {};
    const startTodolists: Array<TodoListDomainType> = [];

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0,
    };

    const action = addTodoListAC(todolist);
    const endTodolistState = todoListReduser(startTodolists, action);
    const endTasksState = tasksReducer(startTasksState, action);


    const key = Object.keys(endTasksState);
    const idFormTasks = key[0];
    const idFormTodolists = endTodolistState[0].id;

    expect(idFormTasks).toBe(action.todoList.id);
    expect(idFormTodolists).toBe(action.todoList.id);
})