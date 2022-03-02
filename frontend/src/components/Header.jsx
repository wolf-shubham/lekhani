import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogoutAction } from '../stateManagement/actions/userActions'

function Header() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userData } = userLogin

    const deleteHandler = () => {
        dispatch(userLogoutAction())
        history('/')
    }

    return (
        <>
            <div>Header</div>
            {userData
                ? <button onClick={deleteHandler}><Link to='/'>logout</Link></button>
                : <button><Link to='/login'>login</Link></button>}
        </>
    )
}

export default Header