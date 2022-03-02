import axios from "axios"
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"

export const LoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user/login', { email, password }, config)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        // console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILURE', payload: error.message })
    }
}