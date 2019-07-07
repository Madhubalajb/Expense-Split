import React from 'react'
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

const ExpenseForm = (props) => {
 return (
    <Container className="split">
        <Form >
            <Row>
                <Col>
                    <Card>
                        <h4>1. Name your Expense</h4>
                        <Form.Control onChange={props.handleExpName} placeholder="Expense Name" /> <br/>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <h4>2. Add your group</h4>
                        {
                            props.members.map((member,index) => {
                                return (
                                    <Row key={index}>
                                        <Form.Control className="col-sm-9" value={member.name || ""} placeholder="Person Name" onChange={(event) => props.handleMember(event, index)} />
                                        <Button className="col-sm-2" variant="dark" onClick={() => props.removeMember(index)}><b>-</b></Button>
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
                        <Form.Control onChange={props.handleAmount} placeholder="Amount" />
                        By whom: 
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Form.Check inline type="radio" label={member.name}></Form.Check>
                                    </div>
                                )
                            })
                        }
                        To whom:
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Form.Check inline type="checkbox" label={member.name}></Form.Check>
                                    </div>
                                )
                            })
                        }
                    </Card>
                </Col>
            </Row>
            <Button variant="dark" className="split_btn" onClick={props.addExpense} type="submit">Finally, Split It</Button>
        </Form>
    </Container>
 )
}

export default ExpenseForm