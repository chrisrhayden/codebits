/* global fetch */
import React, { Component } from 'react'
import {
  FormGroup,
  FormControl
} from 'react-bootstrap'
import './App.css'
import PasteInlineForm from './pasteInlineForm.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      codeText: '',
      codeTitle: '',
      codeAuthor: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.sendToFB = this.sendToFB.bind(this)
  }

  handleTextChange (e, formName) {
    this.setState({[formName]: e.target.value})
  }

  sendToFB () {
    const fbUrl = 'https://firstproj-9f9e1.firebaseio.com/snip.json'

    console.log(this)
    const postInit = {
      method: 'POST',
      body: JSON.stringify({
        codeText: this.state.codeText,
        codeTitle: this.state.codeTitle,
        codeAuthor: this.state.codeAuthor
      })
    }

    console.log(postInit)
    fetch(fbUrl, postInit)
      .then(resp => resp.json())
      .then(console.log)
      .catch(console.log)
  }

  render () {
    return (
      <div id='App'>
        <div id='pasting-form'>
          <form>
            <FormGroup controlId='pasting-text'>
              <FormControl
                componentClass='textarea'
                placeholder='paste text here'
                value={this.state.codeText}
                onChange={(e) => this.handleTextChange(e, 'codeText')}
              />
            </FormGroup>
          </form>
          <PasteInlineForm
            codeText={this.state.codeTitle}
            codeAuthor={this.state.codeAuthor}
            handleTextChange={this.handleTextChange}
            sendToFB={this.sendToFB}
          />
        </div>
      </div>
    )
  }
}

export default App
