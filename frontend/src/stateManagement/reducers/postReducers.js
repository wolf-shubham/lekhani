import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, FOLLOWING_USER_POST_FAILURE, FOLLOWING_USER_POST_REQUEST, FOLLOWING_USER_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, USER_POST_FAILURE, USER_POST_REQUEST, USER_POST_SUCCESS } from "../constants/postConstants";

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

export const likePostsReducer = (state = {}, action) => {
    switch (action.type) {
        case LIKE_POST_REQUEST:
            return { loading: true }
        case LIKE_POST_SUCCESS:
            return { loading: false, likePost: action.payload }
        case LIKE_POST_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const addCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return { loading: true }
        case ADD_COMMENT_SUCCESS:
            return { loading: false, comments: action.payload }
        case ADD_COMMENT_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}