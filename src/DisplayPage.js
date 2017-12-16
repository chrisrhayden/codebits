/* global fetch */
import React, { Component } from 'react'
import './App.css'
import {
  Panel
} from 'react-bootstrap'

class DisplayPage extends Component {
  constructor () {
    super()

    this.state = {
      codeText: '',
      codeTitle: '',
      codeAuthor: '',
      skillSelect: '',
      langSelect: ''
    }
  }

  componentWillMount () {
    let fbUrl = ''
    const snipKey = this.props.match.params.snipKey

    fbUrl = `https://firstproj-9f9e1.firebaseio.com/snip/${snipKey}.json`

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

  render () {
    const rows = this.state.codeText.split('\n').map((thing) => {
      const lang = this.state.langSelect.toLowerCase()
      return (
        <tr>
          <td>
              <code className={`language-${lang}`}><p>{thing}</p></code>
          </td>
        </tr>
      )
    })
    return (
      <div
        id='codeDisplayBox'
      >
        <Panel>
          <table>
            <pre>
            <tbody>
              <tr><td>this is a row</td></tr>
              {rows}
            </tbody>
            </pre>
          </table>
        </Panel>
      </div>
    )
  }
}

export default DisplayPage
