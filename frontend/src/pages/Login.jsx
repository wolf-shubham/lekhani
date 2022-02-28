import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password);
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