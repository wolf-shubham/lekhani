import React from 'react'
import { Link } from 'react-router-dom'

function UserList({ userId, name, displaypic }) {
    return (
        <>
            <div>UserList</div>
            <Link to={`/user/${userId}`}>
                <h3>{name}</h3>
                <img src={displaypic} alt={name} />
            </Link>
        </>
    )
}

export default UserList