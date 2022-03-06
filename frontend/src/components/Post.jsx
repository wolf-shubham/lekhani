import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Post({
    postId,
    postBody,
    likes = [],
    comments = [],
    authorName,
    authorId,
    authorDP
}) {

    const [liked, setLiked] = useState(false)
    const handleLike = () => {
        setLiked(!liked)
    }

    return (
        <>
            <div>Post</div>
            <img src={authorDP} alt='display pic' style={{ width: '35px', borderRadius: '50%' }} />
            <Link to={`/user/${authorId}`}>
                <h2>{authorName}</h2>
            </Link>
            <h3>{postBody}</h3>
            <h3>5 likes</h3>
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