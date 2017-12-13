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
    app.setStaet({ codeText: 'this is a test' })
  })

  it('changes the past box text when text is entered', () => {
    const pastText = app.find('#pasting-text').html()
    console.log(app)
    // console.log(app.find('#pasting-text').)
    expect(pastText).toBe('this is a test')
  })
})
