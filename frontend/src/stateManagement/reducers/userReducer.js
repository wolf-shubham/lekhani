import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userData: action.payload }
        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload }
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userData: action.payload }
        case USER_REGISTER_FAILURE:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

// export const userRegisterReducer = (state = {}, action) => {
//     switch (action.type) {

//         default:
//             return state;
//     }
// }

export const getAllUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return { loading: true }
        case GET_ALL_USER_SUCCESS:
            return { loading: false, users: action.payload }
        case GET_ALL_USER_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const loadUserReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return { loading: true }
        case LOAD_USER_SUCCESS:
            return { loading: false, userSelfData: action.payload }
        case LOAD_USER_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}