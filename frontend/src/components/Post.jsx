import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Post() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const [data, setData] = useState([])

    useEffect(() => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        axios.get('/api/post/userposts', config)
            .then(result => {
                setData(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [setData, userInfo])
    // console.log(data);
    return (
        <>
            <div>Post</div>
            {data.map(post => (
                <div key={post._id} style={{ backgroundColor: 'darkgrey' }}>
                    <h2>{post.body}</h2>
                    <h4>author : {post.author.name}</h4>
                </div>
            ))}
        </>
    )
}

export default Post