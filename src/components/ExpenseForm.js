import React from 'react'
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

const ExpenseForm = (props) => {


 return (
    <Container className="split">
        <Form onSubmit={props.addExpenses} >
            <Row>
                <Col>
                    <Card>
                        <h4 className="one">1</h4>
                        <Form.Control onChange={props.handleExpName} value={props.expName || ""} placeholder="C'mon Name it" required/>
                        <Form.Control onChange={props.handleDate} value={props.date} type="date" required/>
                        <Button title="Name your thing">Make your 1st step</Button>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <h4 className="two">2</h4>
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
                        <i className="material-icons addBtn" title="add member" onClick={(event) => props.addMember(event)}>add_circle</i>
                        <Button>Make your Group</Button>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <h4 className="three">3</h4>
                        <Form.Control onChange={props.handleAmount} value={props.amount || ""} placeholder="Amount" required/>
                        <Row style={{color: "#003B73"}, {fontWeight: 500}}>By whom</Row> 
                        <Row>
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Col><Form.Check type="radio" value={member.name || ""} label={member.name} onChange={props.handleRadio}/></Col>
                                    </div>
                                )
                            })
                        }
                        </Row>

                        <Row style={{color: "#003B73"}, {fontWeight: 500}}>To whom</Row>
                        <Row>
                        {
                            props.members.map((member,index) => {
                                return(
                                    <div key={index}>
                                        <Col><Form.Check type="checkbox" value={member.name || ""} label={member.name} onChange={() => props.handleCheckbox(index)}/></Col>
                                    </div>
                                )
                            })
                        }
                        </Row>
                        <Button title="add more expense" onClick={(event) => (event)}>Add more expense</Button>
                    </Card>
                </Col>
            </Row>
            <Button title="Split" className="split_btn" type="submit"><b>Finally, SPLIT</b></Button>
        </Form>
    </Container>
 )
}

export default ExpenseForm