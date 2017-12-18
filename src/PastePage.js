/* global fetch */

import React, { Component } from 'react'
import PasteBox from './PasteBox'
import PasteInlineForm from './PasteInlineForm'

class PastePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      codeText: '',
      codeTitle: '',
      codeAuthor: '',
      langSelect: '',
      skillSelect: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendToDB = this.sendToDB.bind(this)
  }

  /* i get a eslint error making it a variable */
  handleChange (e, formName) {
    this.setState({[formName]: e.target.value})
  }

  sendToDB () {
    const fbUrl = 'https://firstproj-9f9e1.firebaseio.com/snip.json'
    const postInit = {
      method: 'POST',
      body: JSON.stringify({
        codeText: this.state.codeText,
        codeTitle: this.state.codeTitle,
        codeAuthor: this.state.codeAuthor,
        langSelect: this.state.langSelect,
        skillSelect: this.state.skillSelect
      })
    }

    fetch(fbUrl, postInit)
      .then(resp => resp.json())
      .then((resp) => {
        this.props.history.push(`/snip/${resp.name}`)
      })
      .catch(window.alert)
  }

  render () {
    return (
      <div id='pasting-form'>
        <PasteBox
          codeText={this.state.codeText}
          handleChange={this.handleChange}
        />
        <div
          id='welcomText'
        >
          <p>welcome to codebits, a code review site</p>
          <p>pleas paste a small snippet</p>
          <p>or whole module in to the box</p>
          <p>when youre ready to upload it for review</p>
          <p>press the subit buten and you will be brought to</p>
          <p>the review page</p>
        </div>
        <PasteInlineForm
          codeText={this.state.codeTitle}
          codeAuthor={this.state.codeAuthor}
          handleChange={this.handleChange}
          sendToDB={this.sendToDB}
          langSelect={this.state.langSelect}
        />
      </div>
    )
  }
}
export default PastePage
