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
      }, 5000)
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
      if(expense.expense_name !== null && expense.date !== null && expense.amount !== null && expense.by_whom !== null && expense.members.length !== 0) {
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
          showMessage(<div id="snackbar">Validation failed :</div>)
        })
      }
      else {
        showMessage(<div id="snackbar">Please enter all the details :)</div>)
      }
    } 

    return (
        <center>
            <Notification msg={message} />
            <p><Badge>React JS</Badge > <b>+</b> <Badge>REST API</Badge> <b>+</b> <Badge>Node JS</Badge> <b>+</b> <Badge>Express</Badge> <b>+</b> <Badge>mongoDB</Badge></p>
            
            <ExpenseForm ExpName={handleExpName} date={handleDate} Amount={handleAmount} Member={handleMember} addExpense={addExpense} addMember={addMember} 
                rmMember={removeMember} members={members} expenseName={expName} dateValue={date} amount={amt} radio={handleRadio} checkbox={handleCheckbox}/>
            
            <footer className="bottom">
            designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">madhubala jayakumaran</a> <br/>
            </footer>
        </center>       
    )
}

export default Home