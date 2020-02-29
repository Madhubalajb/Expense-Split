import React from 'react'
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

const ExpenseForm = (props) => {
 return (
    <Container className="split">
        <Form onSubmit={props.addExpense} >
            <Row>
                <Col>
                    <Card>
                        <h4>1. Name your Expense</h4>
                        <Form.Control onChange={props.ExpName} placeholder="Expense Name" required/>
                        <Form.Control onChange={props.date} type="date" placeholder="Date" required/>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <h4>2. Add your group</h4>
                        {
                            props.members.map((member,index) => {
                                return (
                                    <Row key={index}>
                                        <Form.Control className="col-sm-9" value={member.name || ""} placeholder="Person Name" onChange={(event) => props.Member(event, index)} required/>
                                        <Button className="col-sm-2 minusBtn" variant="dark" title="delete member" onClick={() => props.rmMember(index)}><b>-</b></Button>
                                    </Row>
                                )
                            })
                        }
                        <Button variant="dark" title="add member" onClick={(event) => props.addMember(event)}><b>+</b></Button>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <h4>3. Enter the Expense</h4>
                        <Form.Control onChange={props.Amount} placeholder="Amount" required/>
                        <Row><b>By whom:</b></Row> 
                        <Row>
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Col><Form.Check type="radio" value={member.name || ''} label={member.name} onChange={props.radio}/></Col>
                                    </div>
                                )
                            })
                        }
                        </Row>

                        <Row><b>To whom:</b></Row>
                        <Row>
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Col><Form.Check type="checkbox" value={member.name || ''} label={member.name} checked={member.isChecked} onChange={() => props.checkbox(index)}/></Col>
                                    </div>
                                )
                            })
                        }
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Button variant="dark" title="Split" className="split_btn" type="submit">Finally, Split It</Button>
        </Form>
    </Container>
 )
}

export default ExpenseForm