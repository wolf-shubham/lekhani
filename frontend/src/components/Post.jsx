import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPostsAction } from '../stateManagement/actions/postActions'


function Post() {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const dispatch = useDispatch()

    const posts = useSelector((state) => state.userPosts)
    const { loading, userPostsData, error } = posts
    // console.log(userPostsData);

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
                </div>
            ))}
        </>
    )
}

export default Post