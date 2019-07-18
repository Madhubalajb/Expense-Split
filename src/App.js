import React, {useState} from 'react'
import {Badge} from 'react-bootstrap'
import ExpenseForm from './components/ExpenseForm'
import DisplayExpense from './components/DisplayExpense'
import ExpenseModal from './components/ExpenseModal'

const App = () => {
  let dummy = {
    id: 1,
    expense_name: "Trip",
    date: "2019-07-04",
    members: [
      {
        name: "Madhu",
        isChecked: "true"
      },
      {
        name: "Bala",
        isChecked: "true"
      }
    ],
    amount: Number("1000"),
    by_whom: "Madhu"
  }
  const [expenses, setExpenses] = useState([dummy])
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
      date: date,
      members: members,
      amount: Number(amt),
      count: members.length,
      by_whom: by
    }
    setExpenses(expenses.concat(expense))   
    setExpName('')
    setAmt('')
    console.log(expenses[0].expense_name)
    console.log(expenses[0])
    //console.log(`Name: ${expenses[0].expense_name}, Date: ${expenses[0].date}, Amount: ${expenses[0].amount}, By whom: ${expenses[0].by_whom}`)
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

  return (
    <center>
      <h2>Expense / Split</h2>
      <p><Badge>React JS</Badge > + <Badge>REST API</Badge> + <Badge>Node JS</Badge> + <Badge>Express</Badge> + <Badge>MongoDB</Badge></p>
      <ExpenseForm ExpName={handleExpName} date={handleDate} Amount={handleAmount} Member={handleMember} addExpense={addExpense} addMember={addMember} rmMember={removeMember} members={members} radio={handleRadio} checkbox={handleCheckbox}/>
      <DisplayExpense />
      <ExpenseModal dummy={expenses[0]} />
      <p className="bottom">
        designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">Madhubala Jayakumaran</a> <br/>
        On live since July 2019
      </p>
    </center>
  )
}

export default App;