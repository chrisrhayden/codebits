import React, { Component } from 'react'
import './App.css'
import PastePage from './PastePage'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import DisplayPage from './DisplayPage'

class TagsPage extends Component {
  render () {
    return (
      <div>
        <p>the tags page</p>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Router>
        <div id='App'>
          {/*  exact is to only route if alone */}
          <Route exact path='/' render={props => (
            <PastePage {...props} />
          )} />
          <Route path='/snip/:snipKey' render={props => (
            <DisplayPage {...props} />
          )} />
          <Route path='/tags' component={TagsPage} />
        </div>
      </Router>
    )
  }
}

export default App
