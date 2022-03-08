import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllUserReducer, loadUserReducer, userLoginReducer } from './reducers/userReducer'
import { addCommentReducer, followingUsersPostsReducer, likePostsReducer, userPostsReducer } from './reducers/postReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    user: loadUserReducer,
    userPosts: userPostsReducer,
    followingUserPosts: followingUsersPostsReducer,
    getAllUsers: getAllUserReducer,
    postLikes: likePostsReducer,
    postComments: addCommentReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userData: userInfoFromStorage }
}


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store