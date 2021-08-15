import { Dispatch } from 'redux'
import { SetStatusAT, SetErrorAT, setStatus } from '../../../state/app-reducer'
import { clearDeletAC, ClearDeletType } from '../../../state/TodoList-reducer'
import { handleServerNetworkError, hendleServerAppError } from '../../../utils/error-utils'
import { authAPI, LoginParamsType } from './login-api'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setStatus('succeeded'))
            } else {
                hendleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleServerNetworkError(dispatch, error)
        })
}

export const LogoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatus('succeeded'))
                dispatch(clearDeletAC())
            } else {
                hendleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleServerNetworkError(dispatch, error)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | SetStatusAT
    | SetErrorAT
    | ClearDeletType
