/* global jest it describe expect */

import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetch from 'jest-fetch-mock'
import { MemoryRouter } from 'react-router-dom'

import DisplayPage from './DisplayPage'
import PasteInlineForm from './PasteInlineForm'
import PasteBox from './PasteBox'

const fakeData = require('./fakeData')

Enzyme.configure({adapter: new Adapter()})
window.fetch = fetch

describe('integration testing', () => {
  // main integration testing
  it('renders the right text in the code box', () => {
    const bumBumyData = {
      codeText: 'this is code',
      handleChange: jest.fn()
    }
    const appC = shallow(<PasteBox {...bumBumyData} />)
    expect(appC.find('#pastingText').props()['value']).toBe('this is code')
  })

  it('renders the right text in the title box', () => {
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

  it('renders the right text in author box', () => {
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

  it('sets the right lang in the select menu', () => {
    // dummy data
    const bumBumyData = {
      langSelect: 'python',
      handleChange: jest.fn()
    }

    // shallow render the component with dummy data
    const pform = shallow(<PasteInlineForm {...bumBumyData} />)
    // call props again and retrieve value
    expect(pform.find('#langSelect').props().value).toBe('python')
  })

  it('sets the right skill in the select menu', () => {
    // dummy data
    const bumBumyData = {
      skillSelect: 'intermediate'
    }

    // shallow render the component with dummy data
    const pform = shallow(<PasteInlineForm {...bumBumyData} />)
    // call props again and retrieve value
    expect(pform.find('#skillSelect').props().value).toBe('intermediate')
  })

  it('calls the sendToDB callback when clicked', () => {
    const dbCallBack = jest.fn()
    const bumBumyData = {
      codeTitle: 'a title',
      codeAuthor: '',
      langSelect: '',
      skillSelect: '',
      handleChange: jest.fn(),
      sendToDB: dbCallBack
    }

    const shalForm = shallow(<PasteInlineForm {...bumBumyData} />)

    const button = shalForm.find('#submitButton')
    button.simulate('click')
    expect(dbCallBack.mock.calls.length).toBe(1)
  })

  it('renders the display page', () => {
    fetch.mockResponse(JSON.stringify({ fakeData }))

    const disPage = mount(
      <MemoryRouter initialEntries={[ { hash: '/#/snip/-L0OcqJ4eRAB3BxkXZv5' } ]}>
        <DisplayPage />
      </MemoryRouter>)

    console.log('>>>>', disPage.props())
  })
})
