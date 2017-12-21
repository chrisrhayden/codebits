import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  Button,
  Form
} from 'react-bootstrap'
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
        <div
          id='anoTextForm'
        >
          <FormGroup>
            <FormControl
              id='addAnnotationBox'
              componentClass='textarea'
              placeholder='paste text here'
              value={this.props.anoText}
              onChange={(e) => this.props.handleTextChange(e, 'anoText')}
            />
          </FormGroup>
          <Form inline>
            <FormGroup>
              <FormControl
                id='anoAuthorBox'
                placeholder='author'
                type='text'
              />
              {' '}
              <FormControl
                id='anoLineBegin'
                type='number'
                value={this.props.anoLineBegin}
                onChange={(e) => {
                  this.props.handleLineChange(e, 'anoLineBegin')
                }}
              />
              {' '}
              <FormControl
                id='anoLineEnd'
                type='number'
                value={this.props.anoLineEnd}
                onChange={(e) => {
                  this.props.handleLineChange(e, 'anoLineEnd')
                }}
              />
              {' '}
            </FormGroup>
          </Form>
        </div>
        <Button
          bsStyle='primary'
          onClick={this.props.sendAnoToDB}
        >Submit</Button>
      </div>
    )
  }
}

export default WriteAnnotation
