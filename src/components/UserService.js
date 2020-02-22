import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import LoginModal from './Login'
import RegisterModal from './Register'

const UserService = () => {
    const [loginModal, setLoginModal] = useState(false)
    const handleLoginModal = () => setLoginModal(true)
    const handleLoginNoModal = () => setLoginModal(false)

    const [regModal, setRegModal] = useState(false)
    const handleRegModal = () => setRegModal(true)
    const handleRegNoModal = () => setRegModal(false)

    return (
        <div>
            <Button onClick={handleLoginModal}>log In</Button>
            <LoginModal show={loginModal} Close={handleLoginNoModal}/>

            <Button onClick={handleRegModal}>Sign Up</Button>
            <RegisterModal show={regModal} Close={handleRegNoModal}/>
        </div>
    )
}

export default UserService