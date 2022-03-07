import React from 'react'
import { Link } from 'react-router-dom'

function Comment({
    userId, comment, name, displaypic
}) {
    return (
        <>
            <Link to={`/user/${userId}`}>
                <h2>{name}</h2>
                <img src={displaypic} alt={name} style={{ width: '35px', borderRadius: '50%' }} />
            </Link>
            <h3>{comment}</h3>
        </>
    )
}

export default Comment