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
  }

  handleTextChange (e, formName) {
    this.setState({[formName]: e.target.value})
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
          />
        </div>
      </div>
    )
  }
}

export default App
