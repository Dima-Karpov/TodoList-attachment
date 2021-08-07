import React from 'react';
import { setError, SetErrorAT, setStatus, SetStatusAT } from '../state/app-reducer';
import { Dispatch } from 'redux';

export const hanldeServerNetworkError = (dispatch: ErrorUtilsDispatchType,  message: string ) => {
    dispatch(setError(message))
    dispatch(setStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorAT | SetStatusAT >