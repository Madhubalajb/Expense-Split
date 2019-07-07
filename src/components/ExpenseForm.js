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
                        <Form.Control onChange={props.ExpName} placeholder="Expense Name" required/> <br/>
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
                                        <Button className="col-sm-2" variant="dark" onClick={() => props.rmMember(index)}><b>-</b></Button>
                                    </Row>
                                )
                            })
                        }
                        <Button variant="dark" title="add more" onClick={(event) => props.addMember(event)}><b>+</b></Button>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <h4>3. Enter the Expense</h4>
                        <Form.Control onChange={props.Amount} placeholder="Amount" required/>
                        By whom: 
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Form.Check inline type="radio" value={member.name || ''} label={member.name} onChange={props.radio} required/>
                                    </div>
                                )
                            })
                        }
                        To whom:
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Form.Check inline type="checkbox" value={member.name || ''} label={member.name} onChange={props.checkbox} required/>
                                    </div>
                                )
                            })
                        }
                    </Card>
                </Col>
            </Row>
            <Button variant="dark" className="split_btn" type="submit">Finally, Split It</Button>
            <Button variant="dark" type="reset">Reset</Button>
        </Form>
    </Container>
 )
}

export default ExpenseForm