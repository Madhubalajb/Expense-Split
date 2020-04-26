import React, {useState} from'react'
import { Modal, Form, Row, Col, Button} from 'react-bootstrap'

const NewExpenseModal = (props) => {
    const [selectedRadio, setSelectedRadio] = useState('')

    const handleSelectedRadio = (event) => setSelectedRadio(event.target.value ) 

    const handleRadio = (event) => {
        props.handleRadio(event)
        handleSelectedRadio(event)
    }

    return (
        <Modal className="newExpModal" show={props.show} onHide={props.Close}>
            <Modal.Header closeButton><h5>Enter the new Expense details</h5></Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.addExpenseModal}>
                    <Form.Control placeholder="Amount" onChange={props.handleAmount} value={props.amount || ''} required />
                    
                    <Row className="by-to">By whom</Row>
                    <Row>
                    {
                        props.members.map((member,index) => {
                            return (
                                <Col key={index}>
                                    <Form.Check type="radio" checked={selectedRadio === member.name} value={member.name || ''} 
                                        label={member.name} onChange={(event) => handleRadio(event)} />
                                </Col>
                            )
                        })  
                    }
                    </Row>

                    <Row className="by-to">To whom</Row>
                    <Row>
                    {
                        props.to_whom.map((member,index) => {
                            return (
                                <Col key={index}>
                                    <Form.Check type="checkbox" value={member.name || ''} label={member.name} checked={member.isChecked}
                                        onChange={(event) => props.handleCheckbox(event, index)} />
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