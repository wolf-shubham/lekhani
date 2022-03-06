import axios from "axios"
import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

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

export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const userRegisterAction = (name, email, password, displaypic) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user/register', { name, email, password }, config)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAILURE', payload: error.message })
    }
}

export const getAllUserAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USER_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const { data } = await axios.get('/api/user/allusers', config)
        // console.log(data);
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message })
    }
}