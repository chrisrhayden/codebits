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
        <div
          id='anoTextForm'
        >
          <FormGroup>
            <FormControl
              id='addAnnotationBox'
              componentClass='textarea'
              placeholder='paste text here'
              value={this.props.anoText}
              onChange={(e) => this.props.handleChange(e, 'anoText')}
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
                onChange={(e) => this.props.handleChange(e, 'anoLineBegin')}
              />
              {' '}
              <FormControl
                id='anoLineEnd'
                type='number'
                value={this.props.anoLineEnd}
                onChange={(e) => {
                  const value = e.target.value
                  // eslint-disable-next-line no-useless-escape
                  if (value.match('[0-9]+') || value === '') {
                    this.props.handleChange(e, 'anoLineEnd')
                  }
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
