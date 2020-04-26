import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import LoginModal from './Login'
import SignupModal from './Signup'
import Notification from './Notification'
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

    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const showMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const makeNull = () => {
        setName('')
        setUsername('')
        setPassword('')
        handleLoginNoModal()
        handleSignupNoModal()
    }

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
        await loginService.login({
            username, password
        })
        .then(user => {
            window.localStorage.setItem('logged-Expense-Split-User', JSON.stringify(user))
            expenseService.setToken(user.token)
            setUser(user)
            makeNull()
            showMessage(<div id="snackbar">Hi {user.username} <i className="material-icons face">sentiment_very_satisfied</i></div>)
        })
        .catch(error => {
            showMessage(<div id="snackbar">Invalid Username / Password <i className="material-icons face">sentiment_very_dissatisfied</i></div>)
            makeNull()
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        await signupService.signup({
            name, username, password
        })
        .then(savedUser => {
            showMessage(<div id="snackbar">User {savedUser.name} added <i className="material-icons face">sentiment_very_satisfied</i></div>)
            makeNull()
        })
        .catch(error => {
            showMessage(<div id="snackbar">Something went wrong <i className="material-icons face">sentiment_very_dissatisfied</i></div>)
            makeNull()
        })
    }

    const logout = () => {
        showMessage(<div id="snackbar">Bye {user.username} <i className="material-icons face">sentiment_dissatisfied</i></div>)
        setUser('')
        window.localStorage.removeItem('logged-Expense-Split-User')
        expenseService.setToken('')
    }

    if(user === '') {
        return (
            <div>
                <Notification msg={message} />
                <Nav.Link onClick={handleLoginModal}><b>log <span className="foo">In</span></b></Nav.Link>
                <LoginModal show={loginModal} Close={handleLoginNoModal} username={handleUsername} pwd={handlePassword} login={handleLogin}/>
    
                <Nav.Link onClick={handleSignupModal}><b>Sign <span className="foo">Up</span></b></Nav.Link>
                <SignupModal show={signupModal} Close={handleSignupNoModal} name={handleName} username={handleUsername} pwd={handlePassword} 
                signup={handleSignup}/>    

                <Nav.Link><Link to="/about"><b>about</b></Link></Nav.Link>          
            </div>
        )
    }
    else {
        return (
            <div>
                <Notification msg={message} />
                <Nav.Link><Link to="/user"><b>{user.name}</b></Link></Nav.Link>
                <Nav.Link onClick={logout}><b>Logout</b></Nav.Link>
                <Nav.Link><Link to="/about"><b>about</b></Link></Nav.Link>  
            </div>
        )
    }
}

export default UserService