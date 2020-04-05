import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'
import expenseService from '../services/expense-split'

const DisplayExpense = () => {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('logged-Expense-Split-User')
        if(loggedUser) {
            expenseService.getData()
            .then(expenses => setExpenses(expenses.filter(expense => expense.user.id === JSON.parse(loggedUser).id)))
        }
    }, [])

    const showExpense = () => expenses.map((expense, index) => {
            return(
                <Col>
                    <Card className="infoCard" key={index}>
                        <div>
                            <center><h4>{expense.expense_name}</h4></center>
                            <div className="flexDisplay blocks">
                                <i className="material-icons calendar">event</i><span>{new Date(expense.date).toDateString()}</span>
                            </div>
                        </div>
                        <hr/>
                        <div className="blocks">
                            <h6>Your Group</h6>
                            {
                                expense.members.map((member, index) => {
                                    return (
                                        <div key={index} className="flexDisplay">
                                            <i className="material-icons person">person</i><span>{member.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr/>
                        <div className="blocks">
                            <h6>Expenses</h6>
                            {
                                expense.expenses.map((expense, index) => {
                                    let to = expense.to_whom.filter(to => to.isChecked === true)
                                    return (
                                        <div key={index}>
                                            <div className="flexDisplay">
                                                <i className="material-icons white">navigate_next</i>
                                                <span className="white">Amount</span>
                                                <span>{expense.amount}</span>
                                            </div> 
                                            <div>
                                                <span className="white">By</span> 
                                                <span>{expense.by_whom}</span>
                                            </div>
                                            <div>
                                                <span className="white">To</span> 
                                                {
                                                    to.map((to, index) => <span key={index}>{to.name}</span>)
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </Col>
                )
        })
   
    return (
        <Container>
            <Row className="row-cols-4">
                {showExpense()}  
            </Row>
        </Container>
    )
}

export default DisplayExpense