import React, { useEffect } from 'react'
import Post from '../components/Post'
import UserList from '../components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { followingUsersPosts } from '../stateManagement/actions/postActions'

function Home() {
    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const { loading, posts, error } = useSelector((state) => state.followingUserPosts)

    useEffect(() => {
        dispatch(followingUsersPosts())
    }, [])
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

            <UserList
                userId='user._id'
                name='shubham'
                displaypic='user.displaypic'
            />
        </>
    )
}

export default Home