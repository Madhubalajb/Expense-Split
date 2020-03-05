import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import expenseService from '../services/expense-split'

const DisplayExpense = () => {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        expenseService.getData().then(expenses => setExpenses(expenses))
    }, [])

    const showExpense = () => expenses.map(expense =>
            <Card key={expense.id}>
                <h3>{expense.expense_name}</h3>
                <p>{expense.amount}</p>
                <p>{`${expense.date.getDate()}/${expense.date.getMonth()}/${expense.date.getYear()}`}</p>
                <p>{expense.by_whom}</p>
                <p>{expense.members[0].name}</p>
            </Card>
        )
   
    return (
        <div>
            {showExpense()}
        </div>
    )
}

export default DisplayExpense