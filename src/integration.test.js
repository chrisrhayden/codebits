/* global it describe beforeEach expect */

import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({adapter: new Adapter()})

describe('integration testing', () => {
  // main integration testing

  let app

  describe('the paste info box\'s', () => {
    it('changes the past box text when text is entered', () => {
      app = mount(<App />)
      app.setState({ codeText: 'this is a test' })
      const pastText = app.find('#pasting-text').text()
      expect(pastText).toBe('this is a test')
    })
    it('the author and title box text changes when text is entered', () => {
      app = mount(<App />)
      app.setState({ codeAuthor: 'test author' })
      const authorBox = app.find('input')
      expect(authorBox).toBe('test author')
    })
  })
})
