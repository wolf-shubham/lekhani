import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function CreatePost() {
    const [body, setBody] = useState('')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(body)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/post/createpost', { body }, config)
        console.log(data);
    }

    return (
        <>
            <div>CreatePost</div>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" name="body" id="body" label='body' required placeholder='Start Writing...' value={body} onChange={(e) => setBody(e.target.value)} /><br />
                <button type="submit">Create Post</button>
            </form>
        </>
    )
}

export default CreatePost