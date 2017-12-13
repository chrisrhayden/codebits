import React, { Component } from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap'

class PasteInlineForm extends Component {
  render () {
    return (
      <Form inline>
        <FormGroup controlId='snippet-title'>
          <FormControl
            type='text'
            placeholder='title'
            value={this.props.codeTitle}
            onChange={(e) => this.props.handleTextChange(e, 'codeTitle')}
          />
          {' '}
        </FormGroup>
        <FormGroup>
          <FormControl
            type='text'
            id='snippet-author'
            placeholder='author'
            value={this.props.codeAuthor}
            onChange={(e) => this.props.handleTextChange(e, 'codeAuthor')}
          />
        </FormGroup>
        {' '}
        <FormGroup controlId='lang-select'>
          <FormControl
            componentClass='select'
            placeholder='lang'
          >
            <option value='pyhton'>python</option>
            <option value='thing'>thing</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId='skill-select'>
          <FormControl
            componentClass='select'
            placeholder='skill'
          >
            <option value='beginner'>beginner</option>
            <option value='intermediate'>intermediate</option>
            <option value='advance'>advance</option>
          </FormControl>
        </FormGroup>
        <Button bsStyle='primary'
          onClick={this.props.sendToFB}
        >Submit</Button>
      </Form>
    )
  }
}

export default PasteInlineForm
