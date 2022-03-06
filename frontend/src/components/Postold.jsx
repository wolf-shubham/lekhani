import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPostsAction } from '../stateManagement/actions/postActions'


function Post() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const dispatch = useDispatch()

    const posts = useSelector((state) => state.userPosts)
    const { loading, userPostsData, error } = posts
    console.log(userPostsData);

    const likepost = async (postid) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put('/api/post/likepost', { id: postid }, config)
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(userPostsAction())
    }, [dispatch])


    return (
        <>
            <div>Post</div>
            {userPostsData?.map(post => (
                <div key={post._id} style={{ backgroundColor: 'darkgrey' }}>
                    <h2>{post.body}</h2>
                    <h4>author : {post.author.name}</h4>
                    <h3>{post.likes.length} likes</h3>
                    <button onClick={() => { likepost(post._id) }}>like</button>
                    <button onClick={() => { likepost(post._id) }}>unlike</button>
                </div>
            ))}
        </>
    )
}

export default Post