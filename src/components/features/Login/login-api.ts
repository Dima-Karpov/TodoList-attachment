import { CommonResponseType, instance } from "../../../api/todolist-api"

 export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type ResponseMeType = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId: number}>>('/auth/login', data)
    },
    me(){
        return instance.get<CommonResponseType<ResponseMeType>>('/auth/me')
    },
    logout(){
        return instance.delete<CommonResponseType>('/auth/login')
    }
}
