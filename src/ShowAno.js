import React, { Component } from 'react'
/*
import {
  FormGroup,
  FormControl,
  Button,
  Form
} from 'react-bootstrap'
*/
import './App.css'

class WriteAnnotation extends Component {
  render () {
    return (
      <div
        className='popover-content'
        id='annotation'
        style={{
          top: this.props.style.top + 90,
          left: 195
        }}
      >
        <p>{this.props.anoText}</p>
      </div>
    )
  }
}

export default WriteAnnotation
