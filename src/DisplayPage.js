/* global fetch */
import React, { Component } from 'react'
import './App.css'
import {
  Panel
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
      lineCount: -1
    }
  }

  addAnnotation (e) {
    if (e.target.textContent.match('^[0-9]+\n$')) {
      console.log(e.target.textContent)
      console.log('true')
    }
  }

  componentWillMount () {
    let fbUrlBase = 'https://firstproj-9f9e1.firebaseio.com/'
    const snipKey = this.props.match.params.snipKey

    const fbUrl = `${fbUrlBase}snip/${snipKey}.json`

    fetch(fbUrl)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          codeText: resp.codeText.split('\n'),
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

  render () {
    console.log(this.state.lineCount)
    const rows = this.state.codeText ? this.state.codeText.map((codeLine) => {
      const lang = this.state.langSelect.toLowerCase()
      /* I'm unsure how to do this as if I use setState I get
       * Maximum update depth exceeded so im just mutating state like this
       * this.setState({ lineCount: this.state.lineCount++ }) */
      this.state.lineCount++
      return (
        <tr>
          <td>
            <SyntaxHighlighter
              language={lang}
              showLineNumbers
              startingLineNumber={this.state.lineCount}
              style={atelierDuneDark}
              onClick={this.addAnnotation}
            >
              {codeLine}
            </SyntaxHighlighter>
          </td>
        </tr>
      )
    }) : ''
    return (
      <div
        id='codeDisplayBox'
      >
        <Panel>
          <table>
            <tbody>
              <tr>
                <th>
                  Title: {this.state.codeTitle} Author:  {this.state.codeAuthor}
                </th>
              </tr>
              {rows}
            </tbody>
          </table>
        </Panel>
      </div>
    )
  }
}

export default DisplayPage
