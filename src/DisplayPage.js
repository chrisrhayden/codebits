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
      codeTitle: '',
      codeAuthor: '',
      langSelect: '',
      skillSelect: '',
      codeText: ''
    }
  }

  componentWillMount () {
    let fbUrl = ''
    const snipKey = this.props.match.params.snipKey

    fbUrl = `https://firstproj-9f9e1.firebaseio.com/snip/${snipKey}.json`

    fetch(fbUrl)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({...resp})
      })
      .catch((err) => {
        console.log(err)
        this.setState({codeText: '404 page not found'})
      })
  }

  render () {
    const rows = this.state.codeText.split('\n').map((thing) => {
      console.log(thing)
      const lang = this.state.langSelect.toLowerCase()
      return (
        <tr>
          <td>
            <pre class={`language-${lang}`}>
              <code class={`language-${lang}`}><p>{thing}</p></code>
            </pre>
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
            <tbody>
              <tr><td>this is a row</td></tr>
              {rows}
            </tbody>
          </table>
        </Panel>
      </div>
    )
  }
}

export default DisplayPage
