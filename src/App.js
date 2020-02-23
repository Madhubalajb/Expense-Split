import React, {useState} from 'react'
import {Badge} from 'react-bootstrap'
import ExpenseForm from './components/ExpenseForm'
import DisplayExpense from './components/DisplayExpense'
import ExpenseModal from './components/ExpenseModal'
import UserService from './components/UserService'
import expenseService from './services/expense-split'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [expName, setExpName] = useState('')
  const [date, setDate] = useState('')
  const [amt, setAmt] = useState('')
  const [members, setMembers] = useState([{name: null, isChecked: false}])
  const [by, setBy] = useState('')
  
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
      id: expenses.length + 1,
      expense_name: expName,
      date: date,
      members: members,
      amount: Number(amt),
      by_whom: by
    }
    expenseService
      .addData(expense)
      .then(returnedExpense => {
        setExpenses(expenses.concat(returnedExpense)) 
        setExpName('')
        setDate('')
        setAmt('')
        setMembers([])
        setBy('')
      })
  }

  return (
    <div>
      <div className="login-btns"> 
        <UserService />
      </div>
      
      <center>
        <h2>Expense / Split</h2>
        <p><Badge>React JS</Badge > + <Badge>REST API</Badge> + <Badge>Node JS</Badge> + <Badge>Express</Badge> + <Badge>MongoDB</Badge></p>
        <ExpenseForm ExpName={handleExpName} date={handleDate} Amount={handleAmount} Member={handleMember} addExpense={addExpense} addMember={addMember} rmMember={removeMember} members={members} radio={handleRadio} checkbox={handleCheckbox}/>
        <DisplayExpense />
        <ExpenseModal dummy={expenses[0]} />
        <p className="bottom">
          designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">madhubala jayakumaran</a> <br/>
          On live since July 2019
        </p>
      </center>
    </div>
  )
}

export default App;