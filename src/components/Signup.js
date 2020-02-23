import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

const Signup = (props) => {
    return (
        <Modal show={props.show} onHide={props.Close}>
            <Modal.Header closeButton><b>Sign Up</b></Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.signup}>
                    <Form.Control placeholder="Name" onChange={name} required />
                    <Form.Control placeholder="Username" onChange={username} required />
                    <Form.Control placeholder="Password" onChnage={pwd} required />
                    <Button type="submit">Sign Up</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Signup