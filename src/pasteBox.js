import React, { Component } from 'react'
import {
  FormGroup,
  FormControl
} from 'react-bootstrap'
import './App.css'

class App extends Component {
  render () {
    return (
      <form>
        <FormGroup controlId='pasting-text'>
          <FormControl
            componentClass='textarea'
            placeholder='paste text here'
            value={this.props.codeText}
            onChange={(e) => this.props.handleChange(e, 'codeText')}
          />
        </FormGroup>
      </form>
    )
  }
}

export default App
