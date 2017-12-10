/* global it describe beforeEach expect */

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({adapter: new Adapter()})

describe('integration testing', () => {
  // main integration testing

  let app

  beforeEach(() => {
    app = mount(<App />)
  })

  describe('the paste info box\'s', () => {
    it('changes the past box text when text is entered', () => {
      app.setState({ codeText: 'this is a test' })
      const pastText = app.find('#pasting-text').text()
      expect(pastText).toBe('this is a test')
    })
    it('the author and title box text changes when text is entered', () => {
      app.setState({
        codeText: 'this is a test',
        codeAuthor: 'test author',
        codeTitle: 'test title'
      })
      const authorBox = app.find('#snippet-author')
      console.log('authorBox .>>>>>>>>>>>>>>>>', authorBox[0])
      expect(authorBox).toBe('test author')
    })
  })
})
