import React, {useState} from 'react'
import {Badge} from 'react-bootstrap'
import ExpenseForm from './components/ExpenseForm'
import DisplayExpense from './components/DisplayExpense'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [expName, setExpName] = useState('')
  const [amt, setAmt] = useState('')
  const [members, setMembers] = useState([{name: null, isChecked: false}])
  const [by, setBy] = useState('')
  
  const handleExpName = (event) => setExpName(event.target.value)

  const handleAmount = (event) => setAmt(event.target.value)

  const handleRadio = (event) => setBy(event.target.value)

  const handleMember = (event, index) => {
    const temp = [...members]
    temp[index].name = event.target.value
    setMembers(temp)
  }

  const handleCheckbox = (event, index) => {
    const temp = [...members]
    temp[index].isChecked = !temp[index].isChecked
    setMembers(temp)
  }

  const addExpense = (event) => {
    event.preventDefault()
    const expense = {
      id: expenses.length + 1,
      expense_name: expName,
      members: members,
      amount: amt,
      count: members.length,
      by_whom: by
    }
    setExpenses(expenses.concat(expense))   
    setExpName('')
    setAmt('')
    console.log(expenses)
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

  console.log(expenses[0])
  return (
    <center>
      <h2>Expense / Split</h2>
      <p><Badge>React</Badge > + <Badge>Express</Badge> + <Badge>MongoDB</Badge></p>
      <ExpenseForm ExpName={handleExpName} Amount={handleAmount} Member={handleMember} addExpense={addExpense} addMember={addMember} rmMember={removeMember} members={members} radio={handleRadio} checkbox={handleCheckbox}/>
      <DisplayExpense />
      <p className="bottom">
        designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">Madhubala Jayakumaran</a> <br/>
        On live since July 2019
      </p>
    </center>
  )
}

export default App;