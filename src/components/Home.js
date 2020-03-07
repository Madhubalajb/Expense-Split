import React from 'react'

const Home = () => {
    return (
        <center>
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