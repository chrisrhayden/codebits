import React, { Component } from 'react'
import {
  FormGroup,
  FormControl
} from 'react-bootstrap'
import './App.css'

class PasteBox extends Component {
  render () {
    return (
      <form>
        <FormGroup>
          <FormControl
            id='pastingText'
            componentClass='textarea'
            jlaceholder='paste text here'
            value={this.props.codeText}
            onChange={(e) => this.props.handleChange(e, 'codeText')}
          />
        </FormGroup>
      </form>
    )
  }
}

export default PasteBox
