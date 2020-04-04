import React from 'react'
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

const ExpenseForm = (props) => {


 return (
    <Container className="split">
        <Form onSubmit={props.splitExpenses} >
            <Row>
                <Col>
                    <Card>
                        <center><h4 className="one">1</h4></center>
                        <Form.Control onChange={props.handleExpName} value={props.expName || ""} placeholder="C'mon Name it" required/>
                        <Form.Control onChange={props.handleDate} value={props.date} type="date" required/>
                        <center><Button title="Name your thing" onClick={props.handleFirst}>Make your 1st step</Button></center>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <center><h4 className="two">2</h4></center>
                        {
                            props.members.map((member,index) => {
                                return (
                                    <div className="addPerson" key={index}>
                                        <Form.Control value={member.name || ""} placeholder="Person Name" onChange={(event) => props.handleMember(event, index)} />
                                        <i className="material-icons minusBtn" title="delete member" onClick={() => props.removeMember(index)}>delete </i>
                                    </div>
                                )
                            })
                        }
                        <center>
                            <i className="material-icons addBtn" title="add member" onClick={(event) => props.addMember(event)}>add_circle</i>
                        </center>
                        <center><Button title="form group" onClick={props.handleSecond}>Make your Group</Button></center>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <center><h4 className="three">3</h4></center>
                        <Form.Control onChange={props.handleAmount} value={props.amount || ""} placeholder="Amount" required/>
                        <Row style={{color: "#003B73", fontWeight: 600}}>By whom</Row> 
                        <Row>
                        {
                            props.members.map((member,index) => {
                                return(
                                    <Col key={index}>
                                        <Form.Check type="radio" value={member.name || ""} label={member.name} onChange={props.handleRadio} />
                                    </Col>
                                )
                            })
                        }
                        </Row>
                        <Row style={{color: "#003B73", fontWeight: 600}}>To whom</Row>
                        <Row>
                        {
                            props.members.map((member,index) => {
                                return(
                                    <Col key={index}>
                                        <Form.Check type="checkbox" value={member.name || ""} label={member.name} onChange={() => props.handleCheckbox(index)}/>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                        <center>
                            <i className="material-icons addBtn" title="add more expense" onClick={(event) => props.addExpense(event)}>add_circle</i>
                        </center>
                        <center><Button title="add more expense" onClick={props.handleThird}>Add the Expense</Button></center>
                    </Card>
                </Col>
            </Row>
            <Button title="Split" className="split_btn" type="submit">Finally, SPLIT</Button>
        </Form>
    </Container>
 )
}

export default ExpenseForm