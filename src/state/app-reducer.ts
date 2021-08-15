import { setIsLoggedInAC } from "../components/features/Login/auth-reducer";
import { authAPI } from "../components/features/Login/login-api";
import {Dispatch} from 'redux'

export type RequestStatusType = 'loading' | 'idle' | 'succeeded' | 'failed';
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
};
type InitialStateType = typeof initialState;

type ActionsType = SetStatusAT
    | SetErrorAT
    | SetInitialized

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
};

export const setStatus = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export type SetStatusAT = ReturnType<typeof setStatus>

export const setError = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
export type SetErrorAT = ReturnType<typeof setError>

export const setInitialized = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const);
export type SetInitialized = ReturnType<typeof setInitialized>



export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setInitialized(true));
        } else {
        }
    })
    .finally(() => {
        dispatch(setInitialized(true));
    })
 }
 