import { FOLLOWING_USER_POST_FAILURE, FOLLOWING_USER_POST_REQUEST, FOLLOWING_USER_POST_SUCCESS, USER_POST_FAILURE, USER_POST_REQUEST, USER_POST_SUCCESS } from "../constants/postConstants";

export const userPostsReducer = (state = { userPostsData: [] }, action) => {
    switch (action.type) {
        case USER_POST_REQUEST:
            return { loading: true }
        case USER_POST_SUCCESS:
            return { loading: false, userPostsData: action.payload }
        case USER_POST_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const followingUsersPostsReducer = (state = { followingUsersPostsData: [] }, action) => {
    switch (action.type) {
        case FOLLOWING_USER_POST_REQUEST:
            return { loading: true }
        case FOLLOWING_USER_POST_SUCCESS:
            return { loading: false, posts: action.payload }
        case FOLLOWING_USER_POST_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}