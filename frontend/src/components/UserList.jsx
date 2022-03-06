import React from 'react'
import { Link } from 'react-router-dom'

function UserList({ userId, name, displaypic }) {
    return (
        <>
            <Link to={`/user/${userId}`}>
                <h3>{name}</h3>
                <img src={displaypic} alt={name} style={{ width: '35px', borderRadius: '50%' }} />
            </Link>
        </>
    )
}

export default UserList