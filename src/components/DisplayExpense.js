import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import expenseService from '../services/expense-split'

const DisplayExpense = () => {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        expenseService.getData().then(expenses => setExpenses(expenses))
    }, [])

    const showExpense = () => expenses.map(expense => {
        let date = new Date(expense.date)
        let count = expense.members.length
        let share = expense.amount / count
        return(
            <Card key={expense.id}>
                <h3>Expense Name - {expense.expense_name}</h3>
                <p>Amount - {expense.amount}</p>
                <p>Date - {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                <p>By -{expense.by_whom}</p>
                <p>Members {expense.members.map(memb => memb.name)} {share}</p>
            </Card> )
        })
   
    return (
        <div>
            {showExpense()}
        </div>
    )
}

export default DisplayExpense