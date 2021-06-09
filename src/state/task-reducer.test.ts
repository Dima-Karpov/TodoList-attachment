import React from 'react'
import { TaskStateType } from '../App'
import { addTaskAC, chageTaskTitleAC, changeTaskStatusAC, removeTasksAC, tasksReducer } from './task-reducer';

let startState: TaskStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };
});

test.skip('correct task should be deleted from correct array', () => {
   
    const action = removeTasksAC("2", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false },
        ],
    });

});
test.skip('correct task should be added to correct array', () => {
    
    const action = addTaskAC('juce', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isDone).toBe(false);

});
 test.skip('status of specified task should be changed', () => {
   
     const action = changeTaskStatusAC('2', false, 'todolistId2');
     const endState = tasksReducer(startState, action);

     expect(endState['todolistId1'].length).toBe(3);
     expect(endState['todolistId2'].length).toBe(3);
     expect(endState['todolistId2'][1].id).toBe('2');
     expect(endState['todolistId2'][1].id).toBeDefined();
     expect(endState['todolistId2'][1].id).toBe('2');
     expect(endState['todolistId2'][1].isDone).toBe(false);
     expect(endState['todolistId2'][0].isDone).toBe(false);
 });
test.skip('correct the name of the apecified task', () => {
    const newTitle = 'redux';
     const endState = tasksReducer(startState, chageTaskTitleAC('2', newTitle, 'todolistId2'));

     expect(endState["todolistId2"][1].title).toBe(newTitle);
     expect(endState["todolistId2"][1].id).toBe('2');
     expect(endState["todolistId2"][1].isDone).toBe(false);
     expect(endState['todolistId2'][1].id).toBeDefined();
})