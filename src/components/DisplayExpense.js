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
        let to_whom = expense.members.filter(member => member.isChecked === true)
        console.log(to_whom)
        let count = to_whom.length
        console.log(count)
        let share = expense.amount / count
        return(
            <Card key={expense.id}>
                <h3>Expense Name - {expense.expense_name}</h3>
                <p>Amount - {expense.amount}</p>
                <p>Date - {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                <p>By -{expense.by_whom}</p>
                <p>Members {to_whom.map(member => member.name)} {share}</p>
            </Card> )
        })
   
    return (
        <div>
            {showExpense()}
        </div>
    )
}

export default DisplayExpense