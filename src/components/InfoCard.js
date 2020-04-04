import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const InfoCard = (props) => {
    const empty = () => (
        <p>Please proceed with the three steps to split your expenses.</p>
    )

    const first = () => (
        <Row>
            <Col><h6>{props.expName}</h6></Col>
            <Col><i className="material-icons">calendar_today</i>{props.date}</Col>
        </Row>
    )

    const second = () => (
        <div>
            <h6>Your Group</h6>
            {
                props.members.map((member, index) => {
                    return (
                        <div key={index}>
                            <i className="material-icons">person</i> {member.name}
                        </div>
                    )
                })
            }
        </div>
    )

    const third = () => {
        const to = props.expenses.to_whom.filter(to => to.isChecked === true)
        return (
            <div>
                <h6>Expenses</h6>
                {
                    props.expenses.map((expense, index) => {
                        return (
                            <div key={index}>
                                {index + 1} <i className="material-icons">attach_money</i>{expense.amount}
                                <p>By {expense.by_whom}</p>
                                <p>To {to.map(to => to.name)}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    if (props.firstCard === true && props.secondCard === true && props.thirdCard === true) {
        return (
            <Card className="infoCard">
                <Row>{first()}</Row>
                <Row>{second()}</Row>
                <Row>{third()}</Row>
            </Card>
        )
    }
    else if (props.firstCard === true && props.secondCard === true && props.thirdCard === false) {
      return (
            <Card className="infoCard">
                <Row>{first()}</Row>
                <Row>{second()}</Row>
            </Card>
        )
    }
    else if (props.firstCard === true && props.secondCard === false && props.thirdCard === false) {
        return (
            <Card className="infoCard">
               <Row>{first()}</Row>
            </Card>
        )
    }
    else {
        return (
            <Card className="infoCard">
                {empty()}
            </Card>
        )        
    }
}

export default InfoCard