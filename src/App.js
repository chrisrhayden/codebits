/* global fetch */

import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import PasteInlineForm from './pasteInlineForm.js'
import PasteBox from './pasteBox.js'

class TagsPage extends Component {
  render () {
    return (
      <div>
        <p>the tags page</p>
      </div>
    )
  }
}

class PastePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      codeText: '',
      codeTitle: '',
      codeAuthor: '',
      langSelect: '',
      skillSelect: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.sendToFB = this.sendToFB.bind(this)
  }

  handleChange (e, formName) {
    this.setState({[formName]: e.target.value})
  }

  sendToFB () {
    const fbUrl = 'https://firstproj-9f9e1.firebaseio.com/snip.json'

    const postInit = {
      method: 'POST',
      body: JSON.stringify({
        codeText: this.state.codeText,
        codeTitle: this.state.codeTitle,
        codeAuthor: this.state.codeAuthor,
        langSelect: this.state.langSelect,
        skillSelect: this.state.skillSelect

      })
    }

    console.log(postInit.body)
    fetch(fbUrl, postInit)
      .then(resp => resp.json())
      .then(console.log)
      .catch(console.log)
  }

  render () {
    return (
      <div id='pasting-form'>
        {/* my module */}
        <PasteBox
          codeText={this.state.codeText}
          handleChange={this.handleChange}
        />
        {/* my module */}
        <PasteInlineForm
          codeText={this.state.codeTitle}
          codeAuthor={this.state.codeAuthor}
          handleChange={this.handleChange}
          sendToFB={this.sendToFB}
          langSelect={this.state.langSelect}
        />
      </div>
    )
  }
}

class DisplayPage extends Component {
  constructor () {
    super()

    this.state = {
      codeText: ''
    }
  }

  ifFbKeyOrNot (aStr) {
    const patt = '^-[a-zA-Z0-9]+'

    if (aStr.match(patt)) {
      return aStr
    } else {
      return false
    }
  }

  componentWillMount () {
    /* idk why eslint cant deal with assigning in an if */
    let fbUrl = ''
    const unclean = this.props.match.params.snipKey

    const snipKey = this.ifFbKeyOrNot(unclean)

    if (snipKey !== false) {
      fbUrl = `https://firstproj-9f9e1.firebaseio.com/snip.json/${snipKey}`
    } else {
      this.setState({ codeText: 'bad url' })
      return
    }

    const getInit = {
      method: 'GET'
    }

    fetch(fbUrl, getInit)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({ codeText: resp })
      })
      .catch((err) => {
        console.log(err)
        this.setState({codeText: 'issues contacting server'})
      })
  }

  render () {
    return (
      <div>
        <p>{this.state.codeText}</p>
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
          <Route exact path='/' component={PastePage} />
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
