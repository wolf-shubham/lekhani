import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginAction } from '../stateManagement/actions/userActions'

function Login() {

    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userData, error } = userLogin

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(LoginAction(email, password))
    }

    return (
        <>
            <h1>Login...</h1>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="name">name</label> */}
                <input type="email" name="email" id="email" label='email' required placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" label='password' required placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <p>New here? <Link to='/register'>Register</Link></p>
            </form>
        </>
    )
}

export default Login