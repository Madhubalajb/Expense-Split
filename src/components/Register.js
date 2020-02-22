import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const Register = () => {
    return (
        <Modal show={props.show} onHide={props.Close}>
            <Modal.Header closeButton>Register</Modal.Header>
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

export default Register