import React, {useState} from 'react'
import {Badge} from 'react-bootstrap'
import ExpenseForm from './ExpenseForm'
import ExpenseModal from './ExpenseModal'
import Notification from './Notification'
import expenseService from '../services/expense-split'

const Home = () => {
    const [expenses, setExpenses] = useState([])
    const [expName, setExpName] = useState('')
    const [date, setDate] = useState('')
    const [amt, setAmt] = useState('')
    const [members, setMembers] = useState([{name: null, isChecked: false}])
    const [by, setBy] = useState('')
    const [message, setMessage] = useState('')

    const showMessage = (message) => {
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    
    const handleExpName = (event) => setExpName(event.target.value)
  
    const handleDate = (event) => setDate(event.target.value)
  
    const handleAmount = (event) => setAmt(event.target.value)
  
    const handleRadio = (event) => setBy(event.target.value)
  
    const handleMember = (event, index) => {
      const temp = [...members]
      temp[index].name = event.target.value
      setMembers(temp)
    }
   
    const addMember = () => {
      const temp = [...members]
      temp.push({name: null, isChecked: false})
      setMembers(temp)
    }
  
    const removeMember = (index) => {
      const temp = [...members]
      temp.splice(index, 1)
      setMembers(temp)
    }
  
    const handleCheckbox = (index) => {
      const temp = [...members]
      temp[index].isChecked = !temp[index].isChecked
      setMembers(temp)
    }
  
    const addExpense = (event) => {
      event.preventDefault()
      const expense = {
        expense_name: expName,
        date: date,
        members: members,
        amount: Number(amt),
        by_whom: by
      }
      if(expense.expense_name !== '' && expense.date !== '' && expense.amount !== '' && expense.by_whom !== '' && expense.members.length !== 0 &&
        isNaN(expense.amount) !== true) {
        console.log(isNaN(expense.amount))
        expenseService.addData(expense)
        .then(returnedExpense => {
          setExpenses(expenses.concat(returnedExpense)) 
          setExpName('')
          setDate('')
          setAmt('')
          setMembers([])
          setBy('')
        })
        .catch(error => {
          showMessage(<div id="snackbar">Validation failed :( <br />Please verify your details</div>)
        })
      }
      else if(isNaN(expense.amount) === true) {
        showMessage(<div id="snackbar">Please enter a valid Amount :)</div>)
      }
      else {
        showMessage(<div id="snackbar">Please enter all the details :)</div>)
      }
    } 

    return (
        <center>
            <Notification msg={message} />
            
            <ExpenseForm ExpName={handleExpName} date={handleDate} Amount={handleAmount} Member={handleMember} addExpense={addExpense} addMember={addMember} 
                rmMember={removeMember} members={members} expenseName={expName} dateValue={date} amt={amt} radio={handleRadio} checkbox={handleCheckbox}/>
            
            <footer className="bottom">
              <a href="/about">about</a>
            </footer>
        </center>       
    )
}

export default Home