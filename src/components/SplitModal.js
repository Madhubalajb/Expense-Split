import React from 'react'
import { Modal,Form } from 'react-bootstrap'

const SplitModal = (props) => {
    return (
        <Modal>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Form onSubmit={}>
                    <Form.Control onChange={} value={} placeholder="Amount" required />
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SplitModal