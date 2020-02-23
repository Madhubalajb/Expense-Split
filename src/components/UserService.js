import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import LoginModal from './Login'
import SignupModal from './Signup'
import loginService from '../services/login'
import signupService from '../services/signup'
import expenseService from '../services/expense-split'

const UserService = () => {
    const [loginModal, setLoginModal] = useState(false)
    const handleLoginModal = () => setLoginModal(true)
    const handleLoginNoModal = () => setLoginModal(false)

    const [signupModal, setSignupModal] = useState(false)
    const handleSignupModal = () => setSignupModal(true)
    const handleSignupNoModal = () => setSignupModal(false)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState([])

    const handleName = (event) => setName(event.target.value)
    const handleUsername = (event) => setUsername(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('logged-Expense-Split-User', JSON.stringify(user))
            expenseService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } 
        catch (exception){
            console.log(exception)
        }
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        try {
            const addedUser = await signupService.signup({
                name, username, password
            })
            setUser('')
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div>
            <Button onClick={handleLoginModal}>log In</Button>
            <LoginModal show={loginModal} Close={handleLoginNoModal} username={handleUsername} pwd={handlePassword} login={handleLogin}/>

            <Button onClick={handleSignupModal}>Sign Up</Button>
            <SignupModal show={signupModal} Close={handleSignupNoModal} name={handleName} username={handleUsername} pwd={handlePassword} signup={handleSignup}/>
        </div>
    )
}

export default UserService