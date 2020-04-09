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
    const [to_whom, setTo] = useState([{name: null, isChecked: false}, {name: null, isChecked: false}])
    const [members, setMembers] = useState([{name: null}, {name: null}])
    const [expenses, setExpenses] = useState([])
    const [firstCard, setFirst] = useState(false)
    const [secondCard, setSecond] = useState(false)
    const [thirdCard, setThird] = useState(false)
    const [finalCard, setFinal] = useState(false)
    const [newExpModal, setModalUp] = useState(false) 
    const [isExpenseAdded, setExpenseAdded] = useState(false) 
    const [splitted, setSplitted] = useState([])     

    const handleFirst = () => setFirst(true)
    const handleSecond = () => setSecond(true)
    const handleThird = () => setThird(true)
    const handleFinal = () => setFinal(true)
    const handleModalUp = () => setModalUp(true)
    const handleModalDown = () => setModalUp(false)
    const handleExpName = (event) => setExpName(event.target.value)
    const handleDate = (event) => setDate(event.target.value)
    const handleAmount = (event) => setAmount(event.target.value)
    const handleRadio = (event) => setBy(event.target.value)  

    const handleCheckbox = (event, index) => {
        const temp = [...to_whom]
        temp[index].name = event.target.value
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
      
      const temp1 = [...to_whom]
      temp1[index].name = event.target.value
      setTo(temp1)      
    }
   
    const addMember = () => {
      const temp = [...members]
      temp.push({name: null})
      setMembers(temp)

      const temp1 = [...to_whom]
      temp1.push({name: null, isChecked: false})
      setTo(temp1)
    }
  
    const removeMember = (index) => {
      const temp = [...members]
      temp.splice(index, 1)
      setMembers(temp)

      const temp1 = [...to_whom]
      temp1.splice(index, 1)
      setTo(temp1)
    }

    const makeNullExpense = () => {
      setAmount('')
      setBy('')
      const temp = [...to_whom]
      setTo(temp.map(foo => {
        return {name: foo.name, isChecked: false}
      }))
    }

    const makeNullAll = () => {
      setExpName('')
      setDate('')
      setMembers([{name: null}, {name: null}])
      setExpenses([])
      makeNullExpense()
    }

    const addExpense = () => {
      const newExpense = {
        amount: Number(amount),
        by_whom: by_whom,
        to_whom: to_whom
      }
      if(newExpense.amount !== 0 && newExpense.by_whom !== '' && newExpense.to_whom.length !== 0 && isNaN(newExpense.amount) === false) {
        const temp = [...expenses]
        temp.push(newExpense)
        setExpenses(temp)
        setExpenseAdded(true)
        makeNullExpense()
      }
      else if(isNaN(newExpense.amount) === true) {
        showMessage(<div id="snackbar">Please enter a valid Amount</div>)
      }
      else {
        showMessage(<div id="snackbar">Please enter all the Expense details</div>)
      }
    }

    const addExpenseModal = (event) => {
      event.preventDefault()
      addExpense()
      if(newExpModal)
        handleModalDown()
      else
        handleModalUp()
    }

    const addExpenseToInfoCard = () => {
      calculateExpense(expenses)
      if(isExpenseAdded) {
        handleThird()
        setExpenseAdded(false)
      }
      else {
        addExpense()
        handleThird()
        setExpenseAdded(false)
      }
    }
    
    const calculateFurther = (expensesOfEachMembers) => {
      expensesOfEachMembers.forEach((item, firstIndex) => {
        let person1 = { name: item.member, amtToGive: 0 }
        let person2 = { name: null,amtToGive: 0 }
        let found 
        let found1

        item.splittedExp.forEach((item, secondIndex) => {
          person2.name = item.to
          person1.amtToGive = item.amount
          found = expensesOfEachMembers.findIndex(item => item.member === person2.name) 
          
          if(found !== -1) {
            found1 = expensesOfEachMembers[found].splittedExp.findIndex(item => item.to === person1.name)
            if(found1 !== -1) {
              person2.amtToGive = expensesOfEachMembers[found].splittedExp[found1].amount
            }
          }
          
          if(person2.amtToGive !== 0 && person1.amtToGive >= person2.amtToGive) {
            let share = person1.amtToGive - person2.amtToGive
            if(share === 0) {
              expensesOfEachMembers[firstIndex].splittedExp.splice(secondIndex, 1)
              expensesOfEachMembers[found].splittedExp.splice(found1, 1)
            }
            else {
              expensesOfEachMembers[firstIndex].splittedExp[secondIndex].amount = Math.abs(share)
              expensesOfEachMembers[found].splittedExp.splice(found1, 1)
            }
          }
          else if(person2.amtToGive !== 0 && person1.amtToGive < person2.amtToGive) {
            let share = person2.amtToGive - person1.amtToGive
            expensesOfEachMembers[firstIndex].splittedExp.splice(secondIndex, 1)
            expensesOfEachMembers[found].splittedExp[found1].amount = Math.abs(share)
          }
        })
      })
      expensesOfEachMembers = expensesOfEachMembers.filter(element => element.splittedExp.length !== 0)
      setSplitted(expensesOfEachMembers)    
    }

    const calculateExpense = (expenses) => {
      const expensesOfEachMembers = members.map(memb => {
        return { member: memb.name, splittedExp: [] }
      }) 
      expenses.map(expense => {
        let amount = expense.amount
        let by = expense.by_whom
        let to = expense.to_whom.filter(to => to.isChecked === true)
        let share = Math.round((amount/to.length) * 10 / 10)
        
        to.forEach(element => {
          let found = expensesOfEachMembers.findIndex(foo => (foo.member === element.name && foo.member !== by))
          if (found !== -1) {
            expensesOfEachMembers[found].splittedExp.push({to: by, amount: share})
          }
        })
      })
      calculateFurther(expensesOfEachMembers)        
     }
  
    const splitExpenses = () => {
      const newExpense = {
        expense_name: expName,
        date: date,
        members: members,
        expenses: expenses,
        splitted: splitted
      }
      if(newExpense.expense_name !== '' && newExpense.date !== '' && newExpense.members.length !== 0 && newExpense.expenses.length !== 0 &&
        newExpense.splitted.length !== 0) { 
        expenseService.addData(newExpense)
        .then(returnedExpense => {
          handleFinal() 
        })
        .catch(error => {
          showMessage(<div id="snackbar">Validation failed, Please verify expense details.</div>)
        })
      }
      else {
        showMessage(<div id="snackbar">Please enter all the details</div>)
      }
    } 

    return (
        <Container className="home">
            <Notification msg={message} />

            <NewExpenseModal show={newExpModal} Close={handleModalDown} addExpenseModal={addExpenseModal} members={members} to_whom={to_whom} 
                    amount={amount} handleAmount={handleAmount} handleRadio={handleRadio} handleCheckbox={handleCheckbox} />
            
            <Row>
              <Col sm={9}>
                <ExpenseForm handleExpName={handleExpName} expName={expName} handleDate={handleDate} date={date} to_whom={to_whom} 
                        handleMember={handleMember} addMember={addMember} removeMember={removeMember} members={members} 
                        addExpenseModal={addExpenseModal} splitExpenses={splitExpenses} handleAmount={handleAmount} 
                        amount={amount} handleRadio={handleRadio} handleCheckbox={handleCheckbox} handleFirst={handleFirst}
                        handleSecond={handleSecond} handleThird={handleThird} addExpenseToInfoCard={addExpenseToInfoCard} />
              </Col>

              <Col sm={3}>
                <InfoCard expName={expName} date={date} members={members} expenses={expenses} firstCard={firstCard} 
                      secondCard={secondCard} thirdCard={thirdCard} finalCard={finalCard} splitted={splitted} />
              </Col>
            </Row>
        </Container>       
    )
}

export default Home