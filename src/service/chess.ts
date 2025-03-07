import { chessapi, userapi } from "../helpers/baseurl"

export const register = async ({ id }: { id: string }) => {
    return await chessapi.post('/register', { id }).then((c) => c.data)
}


