import axios from "axios"
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, FOLLOWING_USER_POST_FAILURE, FOLLOWING_USER_POST_REQUEST, FOLLOWING_USER_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, USER_POST_FAILURE, USER_POST_REQUEST, USER_POST_SUCCESS } from "../constants/postConstants"

export const userPostsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_POST_REQUEST })
        const { userLogin: { userData } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        const { data } = await axios.get('/api/post/userposts', config)
        dispatch({ type: USER_POST_SUCCESS, payload: data.posts })

    } catch (error) {
        dispatch({ type: USER_POST_FAILURE, payload: error.message })
    }
}

export const followingUsersPosts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FOLLOWING_USER_POST_REQUEST })
        const { userLogin: { userData } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        const { data } = await axios.get('/api/user/followingposts', config)
        dispatch({ type: FOLLOWING_USER_POST_SUCCESS, payload: data.posts })

    } catch (error) {
        dispatch({ type: FOLLOWING_USER_POST_FAILURE, payload: error.message })
    }
}


export const likePostsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: LIKE_POST_REQUEST })
        const { userLogin: { userData } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        const { data } = await axios.get(`/api/post/likepost/${id}`, config)
        dispatch({ type: LIKE_POST_SUCCESS, payload: data.message })

    } catch (error) {
        dispatch({ type: LIKE_POST_FAILURE, payload: error.message })
    }
}


export const addCommentAction = (id, comment) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_COMMENT_REQUEST })
        const { userLogin: { userData } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        const { data } = await axios.post(`/api/post/comment/${id}`, { comment }, config)
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data.message })

    } catch (error) {
        dispatch({ type: ADD_COMMENT_FAILURE, payload: error.message })
    }
}


export const createPostAction = (body) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST })
        const { userLogin: { userData } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        const { data } = await axios.post(`/api/post/createpost`, { body }, config)
        dispatch({ type: CREATE_POST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: CREATE_POST_FAILURE, payload: error.message })
    }
}