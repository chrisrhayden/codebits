/* global fetch */
import React, { Component } from 'react'
import './App.css'

import {
  Panel,
  Overlay
} from 'react-bootstrap'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark } from 'react-syntax-highlighter/styles/hljs'

import WriteAnnotation from './WriteAnnotation'

class DisplayPage extends Component {
  constructor () {
    super()

    this.state = {
      codeText: '',
      codeTitle: '',
      codeAuthor: '',
      skillSelect: '',
      langSelect: '',
      anoText: '',
      anoAuthor: '',
      anoLineBegin: 0,
      anoLineEnd: 0,
      lineCount: 0,
      overlayShow: false,
      overlayTarget: false
    }

    this.addAnnotation = this.addAnnotation.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
    this.sendAnoToDB = this.sendAnoToDB.bind(this)
  }

  handleLineChange (e, formName) {
    const eValue = e.target.value.replace(/[a-zA-Z\W]/g, '')
    this.setState({[formName]: eValue})
  }

  handleTextChange (e, formName) {
    this.setState({[formName]: e.target.value})
  }

  async componentWillMount () {
    let fbUrlBase = 'https://firstproj-9f9e1.firebaseio.com/'
    const snipKey = this.props.match.params.snipKey

    const fbUrl = `${fbUrlBase}snip/${snipKey}.json`

    await fetch(fbUrl)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          codeText: resp.codeText,
          codeTitle: resp.codeTitle,
          codeAuthor: resp.codeAuthor,
          skillSelect: resp.skillSelect,
          langSelect: resp.langSelect
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({codeText: '404 page not found'})
      })

    /* fake need internet */
    const anoUrl = `${fbUrlBase}/ano/ FIRE BASE get by key`
    await fetch(anoUrl)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          anoText: resp.anoText,
          anoAuthor: resp.anoAuthor,
          anoLineBegin: resp.anoLineBegin,
          anoLineEnd: resp.anoLineEnd
        })
      })
      .catch(console.log)
  }

  sendAnoToDB () {
    const urlBase = 'https://firstproj-9f9e1.firebaseio.com/'
    const theUrl = `${urlBase}/ano.json`

    const anoObj = {
      anoText: this.state.anoText,
      anoAuthor: this.state.anoAuthor,
      anoLineBegin: this.state.anoLineBegin,
      anoLineEnd: this.state.anoLineEnd

    }

    const myInit = {
      method: 'POST',
      body: JSON.stringify(anoObj)
    }

    fetch(theUrl, myInit)
      .then(resp => resp.json())
      .then(() => {
        this.setState({
          anoText: '',
          anoLineBegin: '',
          anoLineEnd: '',
          anoAuthor: '',
          overlayShow: false
        })
      })
      .catch(console.log)
  }

  addAnnotation (e) {
    if (e.target.textContent.match('^[0-9]+\n$')) {
      const lineNum = parseInt(e.target.textContent, 10)
      this.setState({
        overlayTarget: e.target,
        overlayShow: true,
        anoLineBegin: lineNum !== 'NaN' ? lineNum : 0
      })
    }
  }

  render () {
    return (
      <div
        id='codeDisplayBox'
      >
        <Panel>
          <p>Title: {this.state.codeTitle}</p>
          <p>Author: {this.state.codeAuthor}</p>
          <SyntaxHighlighter
            language={this.state.langSelect}
            showLineNumbers
            style={atelierDuneDark}
            onClick={this.addAnnotation}
          >
            {this.state.codeText}
          </SyntaxHighlighter>
        </Panel>

        <Overlay
          show={this.state.overlayShow}
          placemant='right'
          container={this}
          target={this.state.overlayTarget}
        >
          <WriteAnnotation
            anoText={this.state.anoText}
            handleTextChange={this.handleTextChange}
            handleLineChange={this.handleLineChange}
            sendAnoToDB={this.sendAnoToDB}
            anoLineBegin={this.state.anoLineBegin}
            anoLineEnd={this.state.anoLineEnd}
          />
        </Overlay>
      </div>
    )
  }
}

export default DisplayPage
