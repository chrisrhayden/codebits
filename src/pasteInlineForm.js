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
            onChange={(e) => this.props.handleChange(e, 'codeTitle')}
          />
          {' '}
        </FormGroup>
        <FormGroup>
          <FormControl
            type='text'
            id='snippetAuthor'
            placeholder='author'
            value={this.props.codeAuthor}
            onChange={(e) => this.props.handleChange(e, 'codeAuthor')}
          />
        </FormGroup>
        {' '}
        <FormGroup controlId='langSelect'>
          <FormControl
            componentClass='select'
            placeholder='lang'
            value={this.props.langSelect}
            onChange={(e) => this.props.handleChange(e, 'langSelect')}
          >
            <option value='lang'>lang</option>
            <option value='pyhton'>python</option>
            <option value='thing'>thing</option>
          </FormControl>
        </FormGroup>
        {' '}
        <FormGroup controlId='skillSelect'>
          <FormControl
            componentClass='select'
            placeholder='skill'
          >
            <option value='skill'>skill</option>
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
