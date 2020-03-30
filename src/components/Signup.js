import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

const Signup = (props) => {
    return (
        <Modal id="signupModal" show={props.show} onHide={props.Close}>
            <Modal.Header closeButton><b>Sign Up</b></Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.signup} className="signupInputs">
                    <Form.Control type="text" placeholder="Name" onChange={props.name} required />
                    <Form.Control type="text" placeholder="Username" onChange={props.username} required />
                    <Form.Control type="password" placeholder="Password" onChange={props.pwd} required />
                    <center><Button type="submit">Sign Up</Button></center>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Signup