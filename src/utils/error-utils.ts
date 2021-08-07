import React from 'react';
import { setError, SetErrorAT, setStatus, SetStatusAT } from '../state/app-reducer';
import { Dispatch } from 'redux';
import { CommonResponseType } from '../api/todolist-api';

export const hendleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: CommonResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Error'))
    }
    dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType,  message: string ) => {
    dispatch(setError(message))
    dispatch(setStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorAT | SetStatusAT >