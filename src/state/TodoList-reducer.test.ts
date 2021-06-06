import React from 'react'
import { v1 } from 'uuid';
import { FilterValueTpe, TodoListType } from '../App';
import { ActionUnionType, addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListReduser } from './TodoList-reducer';

let todoList1: string;
let todoList2: string;
let startState: Array<TodoListType>

(() => {
    todoList1 = v1();
    todoList2 = v1();
    startState = [
        { id: todoList1, title: 'What to learn', filter: 'all' },
        { id: todoList2, title: 'What to buy', filter: 'all' }
    ];
})

test('correct todoList should be removed', () => {
    
    const endState = todoListReduser(startState,  removeTodoListAC(todoList1));

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to buy');
    expect(endState[0].filter).toBe('all');
    expect(endState[0].id).toBe(todoList2);
   
});
test('correct todoList should be added', () => {
  
    let  newTodolistTitle = 'New TodoList';
    const endState = todoListReduser(startState, addTodoListAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('all');
    expect(endState[1].title).toBe('What to learn');
});
test('correct todoList should change its name', () => {
   
    let  newTodolistTitle = 'New TodoList';

    const action: ActionUnionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todoList2,
        newTitle: newTodolistTitle,
    };
    const endState = todoListReduser(startState, changeTodoListTitleAC(todoList2, newTodolistTitle));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState[0].title).toBe('What to learn')
});
test('correct filter of todoList should be change', () => {
   
    let  newFilter: FilterValueTpe = 'completed';

    const action: ActionUnionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID: todoList2,
        filter: newFilter,
    };
    const endState = todoListReduser(startState, changeTodoListFilterAC(todoList2, newFilter));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe('What to buy');
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].filter).toBe(newFilter)
})
