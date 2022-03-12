import { Button, Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import UserList from '../components/UserList'
import { userPostsAction } from '../stateManagement/actions/postActions'

function Profile() {

    const dispatch = useDispatch()

    const [followers, setFollowers] = useState(false)
    const [following, setFollowing] = useState(false)

    const { loading: userLoading, userSelfData: userData, error: userError } = useSelector((state) => state.user)
    const { loading, userPostsData, error } = useSelector((state) => state.userPosts)

    // const { user } = userData
    useEffect(() => {
        dispatch(userPostsAction())
    }, [dispatch])
    return (
        <>
            <div>Profile</div>
            <h2>{userData._id}</h2>
            <div>
                <img src={userData.displaypic} alt='display pic' style={{ width: '35px', borderRadius: '50%' }} />
                <Link to={`/user/${userData._id}`}>
                    <span>{userData.name}</span>
                </Link>
                <h3>{userData.userposts.length} Posts</h3>
                <Button style={{ border: 'none' }} onClick={() => setFollowers(!followers)} >
                    <h3>{userData.followers.length} Followers</h3>
                </Button>
                <Button style={{ border: 'none' }} onClick={() => setFollowing(!following)} disabled={userData.following.length === 0 ? true : false}>
                    <h3>{userData.following.length} Following</h3>
                </Button>
            </div>
            {
                userPostsData && userPostsData.length > 0
                    ? (
                        userPostsData.map(post => (
                            <Post
                                key={post._id}
                                postId={post._id}
                                postBody={post.body}
                                likes={post.likes._id}
                                comments={post.comments}
                                authorName={post.author.name}
                                authorId={post.author._id}
                                authorDP={post.author.displaypic}
                            // isAccount={true}
                            />
                        ))
                    )
                    : <h2>no post of user</h2>
            }
            <Dialog open={followers} onClose={() => setFollowers(!followers)}>
                <div className="DialogBox">
                    <h4>Followers</h4>
                    {userData && userData.followers.length > 0
                        ? userData.followers.map((followers) => (
                            <UserList
                                key={followers._id}
                                userId={followers._id}
                                name={followers.name}
                                displaypic={followers.displaypic}
                            />
                        ))
                        : <h3>No follower as of now...</h3>
                    }
                </div>
            </Dialog>
            <Dialog open={following} onClose={() => setFollowing(!following)}>
                <div className="DialogBox">
                    <h4>Following</h4>
                    {userData && userData.following.length > 0
                        ? userData.following.map((following) => (
                            <UserList
                                key={following._id}
                                userId={following._id}
                                name={following.name}
                                displaypic={following.displaypic}
                            />
                        ))
                        : <h3>Not Following as of now...</h3>}
                </div>
            </Dialog>
        </>
    )
}

export default Profile