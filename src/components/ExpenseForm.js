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
                        <Form.Control onChange={props.ExpName} placeholder="Expense Name"/>
                        <Form.Control onChange={props.date} type="date" placeholder="Date"/>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <h4>2. Add your group</h4>
                        {
                            props.members.map((member,index) => {
                                return (
                                    <Row key={index}>
                                        <Form.Control className="col-sm-9" value={member.name || ""} placeholder="Person Name" onChange={(event) => props.Member(event, index)}/>
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
                        <Form.Control onChange={props.Amount} placeholder="Amount"/>
                        By whom: 
                        {
                            props.members.map((member,index) => {
                                return(
                                    <Form.Check key={index} type="radio" value={member.name || ''} label={member.name} onChange={props.radio}/>
                                )
                            })
                        }
                        To whom:
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Form.Check type="checkbox" value={member.name || ''} label={member.name} checked={member.isChecked} onChange={(event) => props.checkbox(event,index)}/>
                                    </div>
                                )
                            })
                        }
                    </Card>
                </Col>
            </Row>
            <Button variant="dark" className="split_btn" type="submit">Finally, Split It</Button>
        </Form>
    </Container>
 )
}

export default ExpenseForm