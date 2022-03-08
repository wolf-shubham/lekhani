import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCommentAction, followingUsersPosts, likePostsAction, userPostsAction } from '../stateManagement/actions/postActions'
import { Button, Dialog } from '@mui/material'
import UserList from './UserList'
import Comment from './Comment'

function Post({
    postId,
    postBody,
    likes = [],
    comments = [],
    authorName,
    authorId,
    authorDP,
}) {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [likesUser, setLikesUser] = useState(false)
    const [addComment, setAddComment] = useState('')
    const [allComments, setAllComments] = useState(false)
    // console.log(postId);
    const { user } = JSON.parse(localStorage.getItem('userInfo'))

    const handleLike = async () => {
        setLiked(!liked)
        dispatch(likePostsAction(postId))
        dispatch(userPostsAction());
    }

    const addCommentHandler = async (e) => {
        e.preventDefault()
        await dispatch(addCommentAction(postId, addComment))
        dispatch(followingUsersPosts())
    }
    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id])


    return (
        <>
            <div className="postContainer" style={{ border: '1px solid darkgrey', margin: '2rem', padding: '1rem' }}>
                <img src={authorDP} alt='display pic' style={{ width: '35px', borderRadius: '50%' }} />
                <Link to={`/user/${authorId}`}>
                    <span>{authorName}</span>
                </Link>
                <h3>{postBody}</h3>
                <Button onClick={handleLike} style={{ border: 'none' }}>
                    {liked
                        ? <span className='material-icons' style={{ color: 'red' }}>favorite</span>
                        : <i className='material-icons' >favorite_border</i>
                    }
                </Button>
                <br />
                <Button style={{ border: 'none' }} onClick={() => setLikesUser(!likesUser)} >
                    <h3>{likes.length} likes</h3>
                </Button>
                <Button style={{ border: 'none' }} onClick={() => setAllComments(!allComments)} disabled={comments.length === 0 ? true : false}>
                    <h3>{comments.length} comments</h3>
                </Button>

                {/* <Button onClick={() => setAllComments(!allComments)}>
                <i className="material-icons">add_comment</i>
            </Button> */}
                {/* <CircularProgress /> */}
                <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                    <div className="DialogBox">
                        <h4>Liked By</h4>
                        {likes.map((like) => (
                            <UserList
                                key={like._id}
                                userId={like._id}
                                name={like.name}
                                displaypic={like.displaypic}
                            />
                        ))}
                    </div>
                </Dialog>
                <Dialog open={allComments} onClose={() => setAllComments(!allComments)}>
                    <div className="DialogBox">
                        <h4>Comments...</h4>
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                userId={comment.commentPostedBy._id}
                                name={comment.commentPostedBy.name}
                                displaypic={comment.commentPostedBy.displaypic}
                                comment={comment.text}
                            />
                        ))}
                    </div>
                </Dialog>
                <form onSubmit={addCommentHandler}>
                    <input type="text"
                        value={addComment}
                        onChange={(e) => setAddComment(e.target.value)}
                        placeholder='add comment..' />
                    <button type="submit">add</button>
                </form>
            </div>
        </>
    )
}

export default Post