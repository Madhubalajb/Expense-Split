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
        return(
            <Card key={expense.id}>
                <h3>{expense.expense_name}</h3>
                <p>{expense.amount}</p>
                <p>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                <p>{expense.by_whom}</p>
                <p>{expense.members[0].name}</p>
            </Card> )
        })
   
    return (
        <div>
            {showExpense()}
        </div>
    )
}

export default DisplayExpense