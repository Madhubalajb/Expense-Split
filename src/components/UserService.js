import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import Login from './Login'
import Register from './Register'

const UserService = () => {
    const [loginModal, setLoginModal] = useState(false)
    const handleModal = () => setLoginModal(true)
    const handleNoModal = () => setLoginModal(false)

    return (
        <div>
            <Button>log In</Button>
            <Button>Sign Up</Button>
        </div>
    )
}

export default UserService