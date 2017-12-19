/* global fetch */
import React, { Component } from 'react'
import './App.css'
import {
  Panel,
  Overlay
} from 'react-bootstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark } from 'react-syntax-highlighter/styles/hljs'
import WriteAnnotation from './AnnotationPage'

class DisplayPage extends Component {
  constructor () {
    super()

    this.state = {
      codeText: '',
      codeTitle: '',
      codeAuthor: '',
      skillSelect: '',
      langSelect: '',
      lineCount: 0,
      overlayShow: false,
      overlayTarget: false
    }
    this.addAnnotation = this.addAnnotation.bind(this)
  }

  componentWillMount () {
    let fbUrlBase = 'https://firstproj-9f9e1.firebaseio.com/'
    const snipKey = this.props.match.params.snipKey

    const fbUrl = `${fbUrlBase}snip/${snipKey}.json`

    fetch(fbUrl)
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
  }

  async addAnnotation (e) {
    if (e.target.textContent.match('^[0-9]+\n$')) {
      console.log(e.target.textContent)
      await this.setState({
        overlayTarget: e.target,
        overlayShow: true
      })
    }
  }

  render () {
    console.log(this.refs)
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

        {/* show wants ether true or false */}
        <Overlay
          show={this.state.overlayShow}
          placemant='right'
          container={this}
          target={this.state.overlayTarget}
        >
          <WriteAnnotation />
        </Overlay>
      </div>
    )
  }
}

export default DisplayPage
