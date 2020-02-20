import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import Login from './Login'
import Register from './Register'

const UserService = () => {
    return (
        <div>
            <Button>log In</Button>
            <Button>Sign Up</Button>
        </div>
    )
}

export default UserService