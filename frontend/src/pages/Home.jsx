import React, { useEffect } from 'react'
import Post from '../components/Post'
import UserList from '../components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { followingUsersPosts } from '../stateManagement/actions/postActions'
import { getAllUserAction } from '../stateManagement/actions/userActions'

function Home() {
    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const { loading, posts, error } = useSelector((state) => state.followingUserPosts)
    const { loading: getUserLoading, users, error: getUserError } = useSelector((state) => state.getAllUsers)
    // console.log(users);

    useEffect(() => {
        dispatch(followingUsersPosts())
        dispatch(getAllUserAction())
    }, [dispatch])
    return (
        <>
            <div>Home</div>
            <i className='material-icons' >favorite_border</i>
            <i className='material-icons md-48' >favorite</i>
            {
                posts && posts.length > 0
                    ? posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            postBody={post.body}
                            likes={post.likes}
                            comments={post.comments}
                            authorName={post.author.name}
                            authorId={post.author._id}
                            authorDP={post.author.displaypic}
                        />
                    ))
                    : <h1>no user post available</h1>
            }
            {
                users && users.length > 0
                    ? users.map((user) => (
                        <UserList
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            displaypic={user.displaypic}
                        />
                    ))
                    : <h2>no users available</h2>
            }


        </>
    )
}

export default Home