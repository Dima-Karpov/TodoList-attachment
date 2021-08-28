import React, { useCallback } from 'react';
import { AddItemFrom } from '../../AddItemForm/AddItemFrom';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from '../../EditableSpan/EditableSpan';
import { Task } from './Task/Task';
import { TaskType, TaskStatuses } from '../../../api/todolist-api';
import { FilterValuesType } from '../../../state/TodoList-reducer';
import { RequestStatusType } from '../../../state/app-reducer';



type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todoListID: string

    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void

    changeTaskStatus: (todoListID: string, id: string, status: TaskStatuses) => void
    removeTasks: (id: string, todoListID: string) => void
    changeTaskTitle: (todoListID: string, id: string, newTitle: string) => void

    entityStatus: RequestStatusType
}

export const TodoList: React.FC<PropsType> = React.memo((props) => {

    const getTasksForTodoList = () => {
        switch (props.filter) {
            case 'completed':
                return props.tasks.filter(t => t.status === TaskStatuses.New)
            case 'active':
                return props.tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return props.tasks
        }
    };

    let newTasks = getTasksForTodoList();

    const tasks = newTasks.map(t => <Task
        task={t}
        todoListID={props.todoListID}
        changeTaskStatus={props.changeTaskStatus}
        removeTasks={props.removeTasks}
        changeTaskTitle={props.changeTaskTitle}
        key={t.id}
        entityStatus={t.entityStatus}

    />);

    const onClickAllFilter = useCallback(() => { props.changeFilter(props.todoListID, 'all') }, [props]);
    const onClickActiveFilter = useCallback(() => { props.changeFilter(props.todoListID, 'active') }, [props]);
    const onClickCompletedFilter = useCallback(() => { props.changeFilter(props.todoListID, 'completed') }, [props]);

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoListID)
    }, [props]);

    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListID, title)
    }, [props]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    }, [props]);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} entityStatus={props.entityStatus} />
                <IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </h3>
            <div>
                <AddItemFrom addItem={addTask} entityStatus={props.entityStatus} />
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onClickAllFilter}>
                    All</Button>
                <Button
                    style={{ marginLeft: "5px" }}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onClickActiveFilter}
                >Active</Button>
                <Button
                    style={{ marginLeft: "5px" }}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onClickCompletedFilter}
                >Completed</Button>
            </div>
        </div>
    )
});

