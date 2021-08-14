import { CommonResponseType, instance } from "../../../api/todolist-api"

type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId: number}>>('/auth/login', data)
    }
}
