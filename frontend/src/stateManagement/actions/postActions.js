import axios from "axios"
import { USER_POST_FAILURE, USER_POST_REQUEST, USER_POST_SUCCESS } from "../constants/postConstants"

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
        dispatch({ type: USER_POST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_POST_FAILURE, payload: error.message })
    }
}