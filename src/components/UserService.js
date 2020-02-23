import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import LoginModal from './Login'
import SignupModal from './Register'

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

    const handleName = (event) => setName(event.target.value)
    const handleUsername = (event) => setUsername(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)


    return (
        <div>
            <Button onClick={handleLoginModal}>log In</Button>
            <LoginModal show={loginModal} Close={handleLoginNoModal} username={handleUsername} pwd={handlePassword}/>

            <Button onClick={handleSignupModal}>Sign Up</Button>
            <SignupModal show={signupModal} Close={handleSignupNoModal} name={handleName} username={handleUsername} pwd={handlePassword}/>
        </div>
    )
}

export default UserService