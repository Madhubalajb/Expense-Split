import React, {useState,useEffect} from 'react'
import {Nav} from 'react-bootstrap'
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

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('logged-Expense-Split-User')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            expenseService.setToken(user.token)
        }
    }, [])

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
            handleLoginNoModal()
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
            handleSignupNoModal()
        }
        catch (exception) {
            console.log(exception)
        }
    }

    const logout = () => {
        setUser('')
        window.localStorage.removeItem('logged-Expense-Split-User')
        expenseService.setToken('')
    }

    if(user === '') {
        return (
            <div>
                <Nav.Link onClick={handleLoginModal}><b>log <span className="foo">In</span></b></Nav.Link>
                <LoginModal show={loginModal} Close={handleLoginNoModal} username={handleUsername} pwd={handlePassword} login={handleLogin}/>
    
                <Nav.Link onClick={handleSignupModal}><b>Sign <span className="foo">Up</span></b></Nav.Link>
                <SignupModal show={signupModal} Close={handleSignupNoModal} name={handleName} username={handleUsername} pwd={handlePassword} signup={handleSignup}/>              
            </div>
        )
    }
    else {
        return (
            <div>
                <Nav.Link>{user.username}</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </div>
        )
    }
}

export default UserService