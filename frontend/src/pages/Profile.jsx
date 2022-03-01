import React from 'react'
import { useEffect } from 'react'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'

function Profile() {
    useEffect(() => {

    }, [])
    return (
        <>
            <div>Profile</div>
            <CreatePost />
            <Post />
        </>
    )
}

export default Profile