import React from 'react';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import { setError } from '../../state/app-reducer';


const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
};

export const ErrorSnacbar = () => {

    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)    
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if(reason === 'clickaway'){
            return
        }
        dispatch(setError(null))
    };

    return(
        <Snackbar 
            open={error !== null}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity='error'>
                This is a success message
                </Alert>
        </Snackbar>
    )
};





