import React, { Component } from 'react'
import './App.css'

import {
  Panel
} from 'react-bootstrap'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark } from 'react-syntax-highlighter/styles/hljs'

class DisplayPage extends Component {
  render () {
    return (
      <Panel
        id='theCode'
      >
        <p>Title: {this.props.codeTitle}</p>
        <p>Author: {this.props.codeAuthor}</p>
        <SyntaxHighlighter
          language={this.props.langSelect}
          showLineNumbers
          style={atelierDuneDark}
          lineNumberStyle={this.anoOrNot}
          onClick={this.props.addOrShowAno}
        >
          {this.props.codeText}
        </SyntaxHighlighter>
      </Panel>

    )
  }
}

export default DisplayPage
