import React from 'react'
import { TaskStateType} from '../App';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer } from './tasks-reduser';

test.skip('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
     };
 
    const action = removeTasksAC("2", "todolistId2");
   
    const endState = tasksReducer(startState, action)
 
   expect(endState).toEqual({
    "todolistId1": [
        { id: "1", title: "CSS", isDone: false },
        { id: "2", title: "JS", isDone: true },
        { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
        { id: "1", title: "bread", isDone: false },
        { id: "3", title: "tea", isDone: false }
    ]
 });
 
 });
 
 test.skip('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
 
    const action = addTaskAC("juce", "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test.skip('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
 
    const action = changeStatusAC("2", false, "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][1].id).toBeDefined();
    expect(endState["todolistId2"][1].id).toBe("2");
    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId2"][0].isDone).toBe(false);
  });
 
  test.skip('changing the name of the specified task', () => {
    const newTitle = 'redux'
    
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
 
    const endState = tasksReducer(startState, changeTaskTitleAC("2", newTitle, "todolistId2"))
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][1].id).toBeDefined();
    expect(endState["todolistId2"][1].id).toBe("2");
    expect(endState["todolistId2"][1].title).toBe('redux');
    expect(endState["todolistId2"][0].isDone).toBe(false);
  });