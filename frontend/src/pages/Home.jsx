import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [data, setData] = useState()
    useEffect(() => {
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        axios.get('/api/post/allposts', config)
            .then(result => {
                setData(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [setData])
    console.log(data);
    return (
        <>
            <div>Home</div>
            {data?.map(post => (
                <div key={post._id} style={{ backgroundColor: 'darkgrey' }}>
                    <h2>{post.body}</h2>
                    <h4>author : {post.author.name}</h4>
                </div>
            ))}
        </>
    )
}

export default Home