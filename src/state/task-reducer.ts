import React from 'react'
import { v1 } from 'uuid';
import {
    AddTodoListAT, add_todoList, RemoveTodoListAT, SetTodoListAT,
    remove_todoList, set_todoList
} from './TodoList-reducer';
import { Dispatch } from 'redux';
import { TaskStatuses, TaskType, todolistAPI } from '../api/todolist-api';
import { TaskStateType } from '../AppWithRedux';
import { AppRootStateType } from './store';

const remove_tasks = 'REMOVE-TASKS';
const add_task = 'ADD-TASK';
const change_task_status = 'CHANGE-TASK-STATUS';
const change_task_title = 'CHANGE-TASK-TITLE';
const set_tasks = 'SET-TASKS';

type RemoveTasksAT = {
    type: typeof remove_tasks
    id: string
    todoListID: string
};
type AddTaskAT = {
    type: typeof add_task
    task: TaskType
};
type ChangeTaskStatusAT = {
    type: typeof change_task_status
    id: string
    status: TaskStatuses
    todoListID: string
}
type ChangeTaskTilteAT = {
    type: typeof change_task_title
    id: string
    newTitle: string
    todoListID: string
}
type SetTasksAT = {
    type: typeof set_tasks
    tasks: Array<TaskType>
    todoListID: string
}

export type ActionUnionType = RemoveTasksAT
    | AddTaskAT
    | ChangeTaskTilteAT
    | ChangeTaskStatusAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | SetTasksAT


const initialState: TaskStateType = {

    // 'id1':[],
    // 'id2':[],
    // 'id3':[],
    // 'id4':[],

    // [todoListID_1]: [
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "Redax", isDone: true },
    // ],
    // [todoListID_2]: [
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "Redax", isDone: false },
    // ]
};


export const tasksReducer = (tasks: TaskStateType = initialState, action: ActionUnionType): TaskStateType => {
    switch (action.type) {
        case remove_tasks:
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.id)
            }
        case add_task: {
            const stateCopy = { ...tasks }
            const t = stateCopy[action.task.todoListID];
            const newTasks = [action.task, ...t];
            stateCopy[action.task.todoListID] = newTasks;
            return stateCopy;
        }
        case change_task_status:
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.id ? { ...t, isDone: action.status } : t)
            }
        case change_task_title:
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.id ? { ...t, title: action.newTitle } : t)
            }
        case add_todoList:
            return {
                ...tasks,
                [action.todoListID]: []
            }
        case remove_todoList: {
            const copyTasks = { ...tasks }
            delete copyTasks[action.todoListID]
            return copyTasks
        }
        case set_todoList: {
            const copyState = { ...tasks }
            action.todoLists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case set_tasks: {
            const stateCopy = {...tasks}
            stateCopy[action.todoListID] = action.tasks
            return stateCopy
        }
        default:
            return tasks
    }
};

export const removeTasksAC = (id: string, todoListID: string): RemoveTasksAT => {
    return { type: remove_tasks, id, todoListID }
};
export const addTaskAC = (task: TaskType): AddTaskAT => {
    return { type: add_task, task }
};
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todoListID: string ): ChangeTaskStatusAT => {
    return { type: change_task_status,  id, todoListID, status  }
};
export const chageTaskTitleAC = (id: string, newTitle: string, todoListID: string): ChangeTaskTilteAT => {
    return { type: change_task_title, id, newTitle, todoListID }
};
export const setTasksAC = ( tasks: Array<TaskType>, todoListID: string): SetTasksAT => {
    return { type: set_tasks, tasks, todoListID}
};

export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todoListID)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(setTasksAC(tasks, todoListID))
            })
    }
};

export const removeTaskTC = (taskId: string, todoListID: string) => {
    debugger
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(taskId, todoListID)
            .then((res) => {
                dispatch(removeTasksAC(taskId, todoListID))
            })
    }
};
export const addTaskTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todoListID, title)
            .then((res) => {
                const task = res.data.data.item;
                dispatch(addTaskAC(task))
            })
    }
};


export const updateTaskStatusTC = (taskId: string, todoListID: string,  status: TaskStatuses) => {
    debugger
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodoList = allTasksFromState[todoListID]
        const task = tasksForCurrentTodoList.find(t => {
            return t.id === taskId
        });

        if(task) {
            todolistAPI.updateTask(taskId,  todoListID, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
                .then(() => {
                    const action = changeTaskStatusAC(taskId, status, todoListID)
                    dispatch(action)
                })
        }
    } 
}