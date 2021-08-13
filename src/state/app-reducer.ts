
export type RequestStatusType = 'loading' | 'idle' | 'succeeded' | 'failed';
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
};
type InitialStateType = typeof initialState;

type ActionsType = SetStatusAT
    | SetErrorAT

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
};

export const setStatus = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export type SetStatusAT = ReturnType<typeof setStatus>

export const setError = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
export type SetErrorAT = ReturnType<typeof setError>