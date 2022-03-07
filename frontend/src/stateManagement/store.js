import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllUserReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducer'
import { addCommentReducer, followingUsersPostsReducer, likePostsReducer, userPostsReducer } from './reducers/postReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
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
    isAuthenticated: false,
    userLogin: { userData: userInfoFromStorage }
}


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store