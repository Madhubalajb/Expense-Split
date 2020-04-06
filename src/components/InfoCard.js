import React from 'react'
import { Card } from 'react-bootstrap'

const InfoCard = (props) => {
    const IsFirstCardUp = props.firstCard
    const IsSecondCardUp = props.secondCard
    const IsThirdCardUp = props.thirdCard

    const allEmpty = () => (
        <div className="empty">
            <p>Please proceed with the three steps to split your expenses.</p> 
            <p><span className="round">1</span>Name your thing</p>
            <p><span className="round">2</span>Make your group</p>
            <p><span className="round">3</span>Add your expenses</p>
        </div>
    )

    const twoMoreSteps = () => (
        <div className="empty">
            <p>C'mon two more steps to go...</p> 
            <p><span className="round">2</span>Make your group</p>
            <p><span className="round">3</span>Add your expenses</p>
        </div>        
    )

    const oneMoreStep = () => (
         <div className="empty">
            <p>Almost there! one more to go</p> 
            <p><span className="round">3</span>Add your expenses</p>
        </div>        
    )

    const first = () => (
        <div>
            <center><h4>{props.expName}</h4></center>
            <div className="flexDisplay blocks">
                <i className="material-icons calendar">event</i><span>{new Date(props.date).toDateString()}</span>
            </div>
        </div>
    )

    const second = () => (
        <div className="blocks">
            <h6>Your Group</h6>
            {
                props.members.map((member, index) => {
                    return (
                        <div key={index} className="flexDisplay">
                            <i className="material-icons person">person</i><span>{member.name}</span>
                        </div>
                    )
                })
            }
        </div>
    )

    const third = () => {
        return (
            <div className="blocks">
                <h6>Expenses</h6>
                {
                    props.expenses.map((expense, index) => {
                        let to = expense.to_whom.filter(to => to.isChecked === true)
                        return (
                            <div className="blocks" key={index}>
                                <div className="flexDisplay">
                                    <i className="material-icons white">navigate_next</i>
                                    <span className="white">Amount -</span>
                                    <span>{expense.amount}</span>
                                </div> 
                                <div>
                                    <span className="white">By -</span> 
                                    <span>{expense.by_whom}</span>
                                </div>
                                <div>
                                    <span className="white">To -</span> 
                                    {
                                        to.map((to, index) => <span key={index}>{to.name}</span>)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const calculateExpense = () => {
        const expensesOfEachMembers = props.members.map(memb => {
            return {
                member: memb.name,
                splittedExp: []
            }
        })

        props.expenses.map(expense => {
            let amount = expense.amount
            let by = expense.by_whom
            let to = expense.to_whom.filter(to => to.isChecked === true)
            let share = amount/to.length

            to.forEach(element => {
                let found = expensesOfEachMembers.findIndex(foo => foo.member === element.name)
                expensesOfEachMembers[found].splittedExp.push({to: by, amount: share})
            })
        })
    }

    if (IsFirstCardUp && IsSecondCardUp && IsThirdCardUp) {
        return (
            <Card className="infoCard">
                {first()}
                <hr/>
                {second()}
                <hr/>
                {third()}
            </Card>
        )
    }
    else if (IsFirstCardUp && IsSecondCardUp && !IsThirdCardUp) {
      return (
            <Card className="infoCard">
                {first()}
                <hr/>
                {second()}
                <hr/>
                {oneMoreStep()}
            </Card>
        )
    }
    else if (IsFirstCardUp && !IsSecondCardUp && !IsThirdCardUp) {
        return (
            <Card className="infoCard">
                {first()}
                <hr/>
                {twoMoreSteps()}
            </Card>
        )
    }
    else if (!IsFirstCardUp && !IsSecondCardUp && !IsThirdCardUp) {
        return (
            <Card className="infoCard">
                {allEmpty()}
            </Card>
        )           
    }  
}

export default InfoCard