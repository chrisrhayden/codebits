import React, { Component } from 'react'
import './App.css'
import {
  Route,
  HashRouter
} from 'react-router-dom'

import PastePage from './PastePage'
import DisplayPage from './DisplayPage'

// BrowserRouter as Router,

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
      <HashRouter>
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
      </HashRouter>
    )
  }
}

export default App
