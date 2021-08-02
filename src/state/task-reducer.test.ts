import React from 'react'
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';
import { TaskStateType } from '../AppWithRedux';
import { addTaskAC, chageTaskTitleAC, changeTaskStatusAC, removeTasksAC, setTasksAC, tasksReducer } from './task-reducer';
import { setTodoListAC } from './TodoList-reducer';

let startState :TaskStateType = {}

beforeEach(() => {
   let  startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todolistId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },

        ],
        "todolistId2": [
            { id: "2", title: "bread", status: TaskStatuses.New, todolistId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        ],
    };
});

// test.skip('correct task should be deleted from correct array', () => {
   
//     const action = removeTasksAC("2", "todolistId2");
//     const endState = tasksReducer(startState, action);

//     expect(endState).toEqual({
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false },
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "3", title: "tea", isDone: false },
//         ],
//     });

// });
test('correct task should be added to correct array', () => {
    
    const action = addTaskAC({
        todoListID: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists',
    })


    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);

});
//  test.skip('status of specified task should be changed', () => {
   
//      const action = changeTaskStatusAC('2', false, 'todolistId2');
//      const endState = tasksReducer(startState, action);

//      expect(endState['todolistId1'].length).toBe(3);
//      expect(endState['todolistId2'].length).toBe(3);
//      expect(endState['todolistId2'][1].id).toBe('2');
//      expect(endState['todolistId2'][1].id).toBeDefined();
//      expect(endState['todolistId2'][1].id).toBe('2');
//      expect(endState['todolistId2'][1].isDone).toBe(false);
//      expect(endState['todolistId2'][0].isDone).toBe(false);
//  });
// test.skip('correct the name of the apecified task', () => {
//     const newTitle = 'redux';
//      const endState = tasksReducer(startState, chageTaskTitleAC('2', newTitle, 'todolistId2'));

//      expect(endState["todolistId2"][1].title).toBe(newTitle);
//      expect(endState["todolistId2"][1].id).toBe('2');
//      expect(endState["todolistId2"][1].isDone).toBe(false);
//      expect(endState['todolistId2'][1].id).toBeDefined();
// })

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolist1'], 'todolist1');

    const endState = tasksReducer({
        'todolistId2' : [],
        'todolistId1': []
    }, action)


        expect(['todolistId2'].length).toBe(1)
        expect(['todolistId1'].length).toBe(1)
  })
