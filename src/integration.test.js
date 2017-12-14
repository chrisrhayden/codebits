/* global jest it describe expect */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PasteInlineForm from './pasteInlineForm'
import PasteBox from './pasteBox'

Enzyme.configure({adapter: new Adapter()})

describe('integration testing', () => {
  // main integration testing

  it('the title gets the right text when text is entered', () => {
    // dummy data
    const bumBumyData = {
      codeTitle: 'a title',
      codeAuthor: '',
      langSelect: '',
      skillSelect: '',
      handleChange: jest.fn()
    }

    // shallow render the component with dummy data
    const pform = shallow(<PasteInlineForm {...bumBumyData} />)
    // call props again and retrieve value
    expect(pform.find('#snippetTitle').props()['value']).toBe('a title')
  })

  it('gets the author text correctly', () => {
    // dummy data
    const bumBumyData = {
      codeAuthor: 'i am an author',
      handleChange: jest.fn()
    }

    // shallow render the component with dummy data
    const pform = shallow(<PasteInlineForm {...bumBumyData} />)
    // call props again and retrieve value
    expect(pform.find('#snippetAuthor').props()['value']).toBe('i am an author')
  })

  it('changes the past box text when text is entered', () => {
    const bumBumyData = {
      codeText: 'this is code',
      handleChange: jest.fn()
    }
    const appC = shallow(<PasteBox {...bumBumyData} />)
    expect(appC.find('#pastingText').props()['value']).toBe('this is code')
  })
})

/* the grave yard */
// expect(appC.find('#pastingText').props().children.props.value).toBe('this is code')
// get snippetTitle >  props > child > 1st-elm then render again
// const pBox = appC.find('#pastingText').props().children.props.value
// get snippetTitle >  props > child > 1st-elm then render again
// const pformSel = shallow(pform.find('#snippetTitle').props().children[0])
// const pformSel = pform.find('input:#snippetTitle')
// expect(pformSel).toBe('a title')
