import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const history = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const deleteHandler = () => {
        localStorage.removeItem('userInfo')
        history('/')
    }

    return (
        <>
            <div>Header</div>
            {userInfo
                ? <button onClick={deleteHandler}><Link to='/'>logout</Link></button>
                : <button><Link to='/login'>login</Link></button>}
        </>
    )
}

export default Header