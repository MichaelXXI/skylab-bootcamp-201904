import React from 'react'
import literals from './literals'

function Login({ lang, onLogin }) {
    const { title, email, password } = literals[lang]
    function handleSubmit(event) {

        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)
    }

    return <>
        <h1>SkyFlix</h1>
        <section>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder={email} />
                <input type='password' name='password' placeholder={password} />
                <button>{title}</button>
            </form>
        </section>
    </>
}

export default Login