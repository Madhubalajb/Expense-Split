import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'
import Notification from './Notification'
import expenseService from '../services/expense-split'

const DisplayExpense = () => {
    const [expenses, setExpenses] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('logged-Expense-Split-User')
        if(loggedUser) {
            expenseService.getData()
            .then(expenses => setExpenses(expenses.filter(expense => expense.user.id === JSON.parse(loggedUser).id)))
        }
    }, [])

    const showMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    // const handleEditExpense = (expense) => {
    //     let check = window.confirm('Wanna Edit?')
    //     if(check) {
    //         console.log('...')
    //     }
    // }

    const handleRemoveExpense = async (expense) => {
        let check = window.confirm('Wanna delete?')
        if(check) {
            await expenseService.deleteData(expense.id) 
            .then(deleted => {
                setExpenses(expenses.filter(exp => exp.id !== expense.id))
                showMessage(<div id="snackbar">Deleted!</div>)
            })  
            .catch(error => {
                showMessage(<div id="snackbar">Couldn't delete {expense.expense_name}</div>)
            })        
        }
    }

    const showExpense = () => expenses.map((expense, index) => {
            return(
                <Col>
                    <Card className="infoCard" key={index}>
                        <div>
                            <div className="flexDisplay">
                                <h4>{expense.expense_name}</h4>
                                <span className="tools">
                                    {/* <i className="material-icons edit" title="Edit" onClick={() => handleEditExpense(expense)}>edit</i> */}
                                    <i className="material-icons delete" title="delete" onClick={() => handleRemoveExpense(expense)}>delete</i>
                                </span>
                            </div>
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
                                        <div key={index} style={{marginBottom: "10px"}}>
                                            <div className="flexDisplay">
                                                <i className="material-icons white">navigate_next</i>
                                                <span className="white">Amount</span>
                                                <span>{expense.amount}</span>
                                            </div> 
                                            <div>
                                                <span className="white">By</span> 
                                                <span>{expense.by_whom}</span>
                                            </div>
                                            <div style={{width: "max-content"}}>
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
                        <hr/>
                        <div className="blocks">
                            <h6>Splitted Expenses</h6>
                            {
                                expense.splitted.map((firstItem, firstIndex) => {
                                return (
                                    <div key={firstIndex}>
                                    {
                                        firstItem.splittedExp.map((secondItem, secondIndex) => {
                                            return (
                                                <div key={secondIndex} className="flexDisplay">
                                                    <span>{firstItem.member}</span>
                                                    <div className="flexDisplay" style={{color: "white", paddingLeft: "5px", paddingRight: "5px"}}>
                                                        <i className="material-icons">trending_flat</i>
                                                        <span style={{margin: "auto"}}>{secondItem.amount}</span>
                                                    </div>
                                                    <span>{secondItem.to}</span>
                                                </div>
                                        )})
                                    }
                                    </div>
                                )})
                        }
                        </div>
                    </Card>
                </Col>
                )
        })
   
    if (expenses.length === 0) {
        return (
            <center>
                <p>No records to display!</p>
            </center>
        )
    }
    else {
        return (
            <Container fluid>
                <Notification msg={message} />
                <Row>
                    {showExpense()}  
                </Row>
            </Container>
        )
    }
}

export default DisplayExpense