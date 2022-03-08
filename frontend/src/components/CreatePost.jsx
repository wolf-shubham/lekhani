import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPostAction } from '../stateManagement/actions/postActions'

function CreatePost() {

    const dispatch = useDispatch()
    const [body, setBody] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createPostAction(body))
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