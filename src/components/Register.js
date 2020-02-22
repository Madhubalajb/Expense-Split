import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

const Register = (props) => {
    return (
        <Modal show={props.show} onHide={props.Close}>
            <Modal.Header closeButton><b>Sign Up</b></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder="Name" required />
                    <Form.Control placeholder="Username" required />
                    <Form.Control placeholder="Password" required />
                    <Button type="submit">Sign Up</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Register