
export type RequestStatusType = 'loading' | 'idle' | 'succeeded' | 'failed';
const initialState = {
    status: 'loading' as RequestStatusType
};
type InitialStateType = typeof initialState;

type ActionsType = SetStatusAT;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type){
        case 'APP/SET-STATUS':
            return  {...state, status: action.status}
        default: 
            return state
    }
};

export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export type SetStatusAT = ReturnType<typeof setStatus>
