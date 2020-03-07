import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import DisplayExpense from './components/DisplayExpense'

const App = () => {

  return (
      <Router>
        <Navigation />
        <Route exact path="/" component={Home} />
      </Router>
  )
}

export default App;