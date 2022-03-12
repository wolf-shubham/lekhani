import React, { useEffect } from 'react'
import Post from '../components/Post'
import UserList from '../components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { followingUsersPosts } from '../stateManagement/actions/postActions'
import { getAllUserAction } from '../stateManagement/actions/userActions'
import { Link } from 'react-router-dom'
import CreatePost from '../components/CreatePost'

function Home() {
    const dispatch = useDispatch()

    const { loading, posts, error } = useSelector((state) => state.followingUserPosts)
    const { loading: getUserLoading, users, error: getUserError } = useSelector((state) => state.getAllUsers)

    useEffect(() => {
        dispatch(followingUsersPosts())
        dispatch(getAllUserAction())
    }, [dispatch])
    return (
        <>
            <br />
            <br />
            <div>Home</div>
            <Link to='/profile'>Profile</Link>
            <CreatePost />
            <h2>Posts</h2>
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