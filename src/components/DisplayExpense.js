import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'
import expenseService from '../services/expense-split'

const DisplayExpense = () => {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        expenseService.getData().then(expenses => setExpenses(expenses))
    }, [])

    const showExpense = () => expenses.map(expense => {
        let date = new Date(expense.date)
        let to_whom = expense.members.filter(member => member.isChecked === true)
        let count = to_whom.length
        let share = expense.amount / count

        if(count > 0) {
            return(
                <Col>
                    <Card key={expense.id}>
                        <h5>Expense Name - {expense.expense_name}</h5>
                        <p>Amount - {expense.amount}</p>
                        <p>Date - {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                        <p>By - {expense.by_whom}</p>
                        <p>Members {to_whom.map(member => `${member.name} ${share} `) }</p>
                    </Card>
                </Col>
                )
        }
        else {
            return(
                <Col>
                    <Card key={expense.id}>
                        <h5>Expense Name - {expense.expense_name}</h5>
                        <p>Amount - {expense.amount}</p>
                        <p>Date - {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                        <p>By -{expense.by_whom}</p>
                        <p>Members {expense.by_whom} {expense.amount}</p>
                    </Card> 
                </Col>
                )               
        }
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