import React from 'react'
import { Card } from 'react-bootstrap'

const InfoCard = (props) => {
    const IsFirstCardUp = props.firstCard
    const IsSecondCardUp = props.secondCard
    const IsThirdCardUp = props.thirdCard
    const IsFinalCardUp = props.finalCard
    const splitted = props.splitted

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
                                    <span className="white">Amount</span>
                                    <span>{expense.amount}</span>
                                </div> 
                                <div>
                                    <span className="white">By -</span> 
                                    <span>{expense.by_whom}</span>
                                </div>
                                <div style={{width: "max-content"}}>
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

    const final = () => {
        if(splitted.length === 0) {
            return (
                <div className="blocks">
                    <p>None</p>
                </div>
            )
        }
        else {
            return (
                <div className="blocks">
                    <h6>Splitted Expenses</h6>
                    {
                        splitted.map((firstItem, firstIndex) => {
                        return (
                            <div key={firstIndex}>
                            {
                                firstItem.splittedExp.map((secondItem, secondIndex) => {
                                    return (
                                        <div key={secondIndex} className="flexDisplay">
                                            <span>{firstItem.member}</span>
                                            <div className="flexDisplay" style={{color: "white", paddingLeft: "5px", paddingRight: "5px"}}>
                                                <i className="material-icons">trending_flat</i>
                                                <span style={{margin: "auto"}}>{secondItem.amount}</span>
                                            </div>
                                            <span>{secondItem.to}</span>
                                        </div>
                                )})
                            }
                            </div>
                        )})
                    }
                </div>
            )
        }
    }

    if (IsFirstCardUp && IsSecondCardUp && IsThirdCardUp && !IsFinalCardUp) {
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
    else if (IsFirstCardUp && IsSecondCardUp && !IsThirdCardUp && !IsFinalCardUp) {
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
    else if (IsFirstCardUp && !IsSecondCardUp && !IsThirdCardUp && !IsFinalCardUp) {
        return (
            <Card className="infoCard">
                {first()}
                <hr/>
                {twoMoreSteps()}
            </Card>
        )
    }
    else if (IsFirstCardUp && IsSecondCardUp && IsThirdCardUp && IsFinalCardUp) {
        return (
            <Card className="infoCard">
                {first()}
                <hr/>
                {second()}
                <hr/>
                {final()}
            </Card>
        )
    }    
    else {
        return (
            <Card className="infoCard">
                {allEmpty()}
            </Card>
        )           
    }  
}

export default InfoCard