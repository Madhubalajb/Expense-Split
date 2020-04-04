import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import InfoCard from './InfoCard'
import ExpenseForm from './ExpenseForm'
import Notification from './Notification'
import NewExpenseModal from './NewExpenseModal'
import expenseService from '../services/expense-split'

const Home = () => {
    const [message, setMessage] = useState('')
    const [expName, setExpName] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [by_whom, setBy] = useState('')
    const [to_whom, setTo] = useState([])
    const [members, setMembers] = useState([{name: null}, {name: null}])
    const [expenses, setExpenses] = useState([])

    const [firstCard, setFirst] = useState(false)
    const [secondCard, setSecond] = useState(false)
    const [thirdCard, setThird] = useState(false)

    const handleFirst = () => setFirst(true)
    const handleSecond = () => setSecond(true)
    const handleThird = () => setThird(true)

    const [newExpModal, setModalUp] = useState(false)   
    const handleModalUp = () => setModalUp(true)
    const handleModalDown = () => setModalUp(false)

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
      makeNullExpense()
    }

    const addExpense = (event) => {
      event.preventDefault()
      const newExpense = {
        amount: Number(amount),
        by_whom: by_whom,
        to_whom: to_whom
      }
      if(newExpense.amount !== 0 && newExpense.by_whom !== '' && newExpense.to_whom.length !== 0 && isNaN(newExpense.amount) === false) {
        const temp = [...expenses]
        temp.push(newExpense)
        setExpenses(temp)
        makeNullExpense()
        if (newExpModal)
          handleModalDown()
        else
          handleModalUp()
      }
      else if(isNaN(newExpense.amount) === true) {
        showMessage(<div id="snackbar">Please enter a valid Amount</div>)
      }
      else {
        showMessage(<div id="snackbar">Please enter all the Expense details</div>)
      }
    }
  
    const splitExpenses = (event) => {
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
        <Container className="home">
            <Notification msg={message} />

            <NewExpenseModal show={newExpModal} Close={handleModalDown} addExpense={addExpense} members={members} amount={amount} 
                        handleAmount={handleAmount} handleRadio={handleRadio} handleCheckbox={handleCheckbox} />
            
            <Row>
              <Col sm={10}>
                  <ExpenseForm handleExpName={handleExpName} expName={expName} handleDate={handleDate} date={date} 
                        handleMember={handleMember} addMember={addMember} removeMember={removeMember} members={members} 
                        addExpense={addExpense} splitExpenses={splitExpenses} handleAmount={handleAmount} amount={amount} 
                        handleRadio={handleRadio} handleCheckbox={handleCheckbox} handleFirst={handleFirst}
                        handleSecond={handleSecond} handleThird={handleThird} />
              </Col>

              <Col sm={2}>
                <InfoCard expName={expName} date={date} members={members} expenses={expenses} 
                        firstCard={firstCard} secondCard={secondCard} thirdcard={thirdCard} />
              </Col>
            </Row>
        </Container>       
    )
}

export default Home