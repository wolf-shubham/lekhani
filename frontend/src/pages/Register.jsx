import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(name, email, password);
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user/register', { name, email, password }, config)
        console.log(data);
    }

    return (
        <>
            <h1>register...</h1>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="name">name</label> */}
                <input type="text" name="name" label='name' id="name" required placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" name="email" id="email" label='email' required placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" label='password' required placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
                <p>already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </>
    )
}

export default Register