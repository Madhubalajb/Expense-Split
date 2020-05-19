import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'
import DisplayExpense from './components/DisplayExpense'

const App = () => {

  return (
      <Router>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route exact path="/user" render={() => <DisplayExpense />} />
      </Router>
  )
}

export default App;