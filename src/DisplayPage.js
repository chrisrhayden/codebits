/* global fetch */
import React, { Component } from 'react'
import './App.css'
import {
  Panel,
  Popover,
  Overlay
} from 'react-bootstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark } from 'react-syntax-highlighter/styles/hljs'

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
      overlayShow: 0,
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

  addAnnotation (e) {
    console.log('>>>>>', e)
    console.log(e.target)

    if (e.target.textContent.match('^[0-9]+\n$')) {
      console.log('true')

      this.setState({
        overlayTarget: e.target,
        overlayShow: e.target.textContent
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
          id='popup'
          show={this.state.overlayShow}
          target={this.state.overlayTarget}
          placment='right'
          container={this.state.target}
        >
          <Popover
            id='popover-positioned-right'
            placment='left'
          >
            <textarea />
          </Popover>
        </Overlay>
      </div>
    )
  }
}

export default DisplayPage
