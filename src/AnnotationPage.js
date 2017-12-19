import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap'
import './App.css'

class WriteAnnotation extends Component {
  render () {
    console.log(this.props.style)
    /* add css to App.css */
    return (
      <div
        className='popover-content'
        id='annotation'
        style={{
          top: this.props.style.top + 90,
          left: 195
        }}
      >
        <FormGroup>
          <FormControl
            id='annotationBox'
            componentClass='textarea'
            placeholder='paste text here'
            value={this.props.codeText}
            onChange={(e) => this.props.handleChange(e, 'codeText')}
          />
        </FormGroup>
        <Button bsStyle='primary'>Submit</Button>
      </div>
    )
  }
}

export default WriteAnnotation
