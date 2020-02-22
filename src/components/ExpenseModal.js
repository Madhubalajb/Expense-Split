import React from'react'
import { Modal } from 'react-bootstrap'

const ExpenseModal = (props) => {
    return (
        <Modal>
            <Modal.Header closeButton>{props.expense_name}</Modal.Header>
            <Modal.Body>
                Date: {props.date}
                Amount spent: {props.amount}
                {/* Members: {props.members.map(member => <li>member.name</li>)} */}
            </Modal.Body>
        </Modal>
    )
}

export default ExpenseModal