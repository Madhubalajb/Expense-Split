import React, {useState} from 'react'
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

const ExpenseForm = (props) => {
    const [selectedRadio, setSelectedRadio] = useState('')

    const handleSelectedRadio = (event) => setSelectedRadio(event.target.value ) 

    const handleRadio = (event) => {
        props.handleRadio(event)
        handleSelectedRadio(event)
    }

 return (
    <Container className="split">
        <Form onSubmit={props.splitExpenses} >
            <Row>
                <Col>
                    <Card>
                        <center><h4 className="one">1</h4></center>
                        <Form.Control onChange={props.handleExpName} value={props.expName || ""} placeholder="C'mon Name it" required/>
                        <Form.Control onChange={props.handleDate} value={props.date} type="date" required/>
                        <center><Button title="Name your thing" onClick={props.handleFirst}>Name your thing</Button></center>
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
                                        <i className="material-icons minusBtn" title="delete member" onClick={() => props.removeMember(index)}>delete</i>
                                    </div>
                                )
                            })
                        }
                        <center>
                            <i className="material-icons addBtn" title="add member" onClick={(event) => props.addMember(event)}>add_circle</i>
                        </center>
                        <center><Button title="form group" onClick={props.handleSecond}>Make your group</Button></center>
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
                                        <Form.Check type="radio" checked={selectedRadio === member.name} value={member.name || ""} 
                                        label={member.name} onChange={(event) => handleRadio(event)} />
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
                                        <Form.Check type="checkbox" value={member.name || ""} label={member.name} 
                                            onChange={(event) => props.handleCheckbox(event, index)}/>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                        <center>
                            <i className="material-icons addBtn" title="add more expense" onClick={(event) => props.addExpenseModal(event)}>add_circle</i>
                        </center>
                        <center><Button title="add the expenses" onClick={props.addExpenseToInfoCard}>Add the expenses</Button></center>
                    </Card>
                </Col>
            </Row>
            <center><Button title="Split the expenses" className="split_btn" type="submit">Finally, SPLIT</Button></center>
        </Form>
    </Container>
 )
}

export default ExpenseForm