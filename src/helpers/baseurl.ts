import axios from "axios";
import { Config } from "../config/config";


export const userapi = axios.create({
    baseURL: Config.SERVER_URL + '/api/v1/users',
})


