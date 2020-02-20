import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const Register = () => {
    return (
        <Modal>
            <Modal.Header>Register</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder="Name" required />
                    <Form.Control placeholder="Username" required />
                    <Form.control placeholder="Password" required />
                    <Button type="submit">Sign Up</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Register;