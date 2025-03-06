import { userapi } from "../helpers/baseurl"

export const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    return await userapi.post('/register', { name, email, password }).then((c) => c.data)
}
export const login = async ({ email, password }: { email: string, password: string }) => {
    return await userapi.post('/login', { email, password }).then((c) => c.data)
}

