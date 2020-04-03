import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ExpenseForm from './ExpenseForm'
import Notification from './Notification'
import expenseService from '../services/expense-split'

const Home = () => {
    const [expName, setExpName] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [by_whom, setBy] = useState('')
    const [to_whom, setTo] = useState([{name: null, isChecked: false}])
    const [members, setMembers] = useState([{name: null}, {name: null}])
    const [expenses, setExpenses] = useState([{amount: null, by_whom: null, to_whom: [{name: null, isChecked: false}]}])
    const [message, setMessage] = useState('')

    const handleExpName = (event) => setExpName(event.target.value)
    const handleDate = (event) => setDate(event.target.value)
    const handleAmount = (event) => setAmount(event.target.value)
    const handleRadio = (event) => setBy(event.target.value)

    const handleCheckbox = (index) => {
        const temp = members.map(member => {
           return {
                name: member.name,
                isChecked: false
            }
        })
        temp[index].isChecked = !temp[index].isChecked
        setTo(temp)
    }

    const showMessage = (message) => {
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
     
    const handleMember = (event, index) => {
      const temp = [...members]
      temp[index].name = event.target.value
      setMembers(temp)
    }
   
    const addMember = () => {
      const temp = [...members]
      temp.push({name: null})
      setMembers(temp)
    }
  
    const removeMember = (index) => {
      const temp = [...members]
      temp.splice(index, 1)
      setMembers(temp)
    }

    const makeNullExpense = () => {
      setAmount('')
      setBy('')
      setTo([])
    }

    const makeNullAll = () => {
      setExpName('')
      setDate('')
      setMembers([])
      setExpenses([])
    }

    const addExpense = (event) => {
      event.preventDefault()
      const newExpense = {
        amount: Number(amount),
        by_whom: by_whom,
        to_whom: to_whom
      }
      if(newExpense.amount !== '' && newExpense.by_whom !== '' && newExpense.to_whom.length !== 0 && isNaN(newExpense.amount) === false) {
        const temp = [...expenses]
        temp.push(newExpense)
        setExpenses(temp)
        makeNullExpense()
      }
      else if(isNaN(newExpense.amount) === true) {
        showMessage(<div id="snackbar">Please enter a valid Amount</div>)
        makeNullExpense()
      }
      else {
        showMessage(<div id="snackbar">Please enter all the Expense details</div>)
        makeNullExpense()
      }
    }
  
    const addExpenses = (event) => {
      event.preventDefault()
      const newExpense = {
        expense_name: expName,
        date: date,
        members: members,
        expenses: expenses
      }
      if(newExpense.expense_name !== '' && newExpense.date !== '' && newExpense.members.length !== 0 && newExpense.expenses.length !== 0) {
        expenseService.addData(newExpense)
        .then(returnedExpense => {
          makeNullAll()
        })
        .catch(error => {
          showMessage(<div id="snackbar">Validation failed, Please verify expense details.</div>)
          makeNullAll()
        })
      }
      else {
        showMessage(<div id="snackbar">Please enter all the details</div>)
        makeNullAll()
      }
    } 

    return (
        <center>
            <Notification msg={message} />
            
            <ExpenseForm handleExpName={handleExpName} expName={expName} handleDate={handleDate} date={date} handleMember={handleMember} addMember={addMember} 
            removeMember={removeMember} members={members} addExpense={addExpense} addExpenses={addExpenses} handleAmount={handleAmount} amount={amount} handleRadio={handleRadio} 
            handleCheckbox={handleCheckbox} />
            
            <footer className="bottom"><Link to="/about">about</Link></footer>
        </center>       
    )
}

export default Home