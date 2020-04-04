import React from'react'
import { Modal, Form, Row, Col, Button} from 'react-bootstrap'

const NewExpenseModal = (props) => {
    return (
        <Modal className="newExpModal" show={props.show} onHide={props.Close}>
            <Modal.Header closeButton><h5>Enter the new Expense details</h5></Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.addExpense}>
                    <Form.Control placeholder="Amount" onChange={props.handleAmount} value={props.amount || ''} required />
                    
                    <Row className="by-to">By whom</Row>
                    <Row>
                    {
                        props.members.map((member,index) => {
                            return (
                                <Col key={index}>
                                    <Form.Check type="radio" value={member.name || ''} label={member.name} onChange={props.handleRadio} />
                                </Col>
                            )
                        })
                    }
                    </Row>

                    <Row className="by-to">To whom</Row>
                    <Row>
                    {
                        props.members.map((member,index) => {
                            return (
                                <Col key={index}>
                                    <Form.Check type="checkbox" value={member.name || ''} label={member.name} onChange={() => props.handleCheckbox(index)} />
                                </Col>
                            )
                        })
                    }
                    </Row>
                    <center><Button type="submit">Add Expense</Button></center>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewExpenseModal