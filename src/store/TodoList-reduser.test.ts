import React from 'react'
import { v1 } from 'uuid'
import { FilterValueTpe, TodoListType } from '../App';
import { ActionUnionType, AddTodoListAC, change_todoList_title, ChanngeFilterAC, ChanngeTodoListTitleAC, remove_todoList, todoListReduser } from './TodoList-reducer';

test.skip('correct todolist should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todoListReduser(startState, {type: remove_todoList, todoListID: todoListId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test.skip('correct todolist should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();
    
    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todoListReduser(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
});

test.skip('correct todolist should change its name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();
    
    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ];

    const action: ActionUnionType= {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todoListId2,
        newTitle: newTodoListTitle
    };
    const endState = todoListReduser(startState, ChanngeTodoListTitleAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test.skip('correct todolist should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();
    
    let newFilter: FilterValueTpe = 'completed';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ];

    const action: ActionUnionType= {
        type: 'CHANGE-FILTER',
        todoListID: todoListId2,
        filter: newFilter
    };
    const endState = todoListReduser(startState, ChanngeFilterAC(newFilter, todoListId2));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].filter).toBe(newFilter);
});