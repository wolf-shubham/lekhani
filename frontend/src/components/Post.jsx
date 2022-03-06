import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likePostsAction } from '../stateManagement/actions/postActions'

function Post({
    postId,
    postBody,
    likes = [],
    comments = [],
    authorName,
    authorId,
    authorDP
}) {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    // console.log(postId);

    const handleLike = () => {
        setLiked(!liked)
        dispatch(likePostsAction(postId))
    }

    return (
        <>
            <div>Post</div>
            <img src={authorDP} alt='display pic' style={{ width: '35px', borderRadius: '50%' }} />
            <Link to={`/user/${authorId}`}>
                <h2>{authorName}</h2>
            </Link>
            <h3>{postBody}</h3>
            <h3>{likes.length} likes</h3>
            <button onClick={handleLike} style={{ border: 'none' }}>
                {liked
                    ? <span className='material-icons' style={{ color: 'red' }}>favorite</span>
                    : <i className='material-icons' >favorite_border</i>
                }
            </button>
            <i className="material-icons">add_comment</i>
        </>
    )
}

export default Post