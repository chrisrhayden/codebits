/* global fetch */
import React, { Component } from 'react'
import './App.css'

import {
  Overlay
} from 'react-bootstrap'

// import giveRightSnip from './utils'

import WriteAnnotation from './WriteAnnotation'
import ShowAno from './ShowAno'
import CodeDisplay from './CodeDisplay'

class DisplayPage extends Component {
  constructor () {
    super()

    this.state = {
      snipKey: 0,
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
      overlayTarget: null,
      allAnos: {},
      anoLines: [],
      anoOverlayShow: false,
      anoOverlayTarget: false,
      currentAno: ''
    }

    this.addAnnotation = this.addAnnotation.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
    this.sendAnoToDB = this.sendAnoToDB.bind(this)
    this.addOrShowAno = this.addOrShowAno.bind(this)
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

    /*
    const aSnip = giveRightSnip(snipKey)[1]

    this.setState({
      snipKey,
      codeText: aSnip.codeText,
      codeTitle: aSnip.codeTitle,
      codeAuthor: aSnip.codeAuthor,
      skillSelect: aSnip.skillSelect,
      langSelect: aSnip.langSelect
    })
    */

    const fbUrl = `${fbUrlBase}snip/${snipKey}.json`

    await fetch(fbUrl)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          snipKey,
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

    const anoUrl = `${fbUrlBase}/ano.json`

    await fetch(anoUrl)
      .then(resp => resp.json())
      .then((resp) => {
        const allAnos = Object.values(resp).filter((obj) => {
          return obj.snipKey === this.state.snipKey
        })

        const anoLines = allAnos.map((obj) => {
          return obj.anoLineBegin
        })

        this.setState({allAnos: allAnos, anoLines: anoLines})
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
      anoLineEnd: this.state.anoLineEnd,
      snipKey: this.state.snipKey

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
        anoOverlayShow: false,
        anoLineBegin: lineNum !== 'NaN' ? lineNum : 0
      })
    }
  }

  showAno (e) {
    const lNum = parseInt(e.target.textContent, 10)
    const anoT = this.state.allAnos.filter((obj) => {
      return obj.anoLineBegin === lNum ? obj : false
    })

    console.log('>>>>>>', anoT[0].anoText)

    this.setState({
      anoOverlayTarget: e.target,
      anoOverlayShow: true,
      overlayShow: false,
      currentAno: anoT[0].anoText
    })
  }

  addOrShowAno (e) {
    const l = parseInt(e.target.textContent, 10)
    if (this.state.anoLines.includes(l)) {
      console.log('in if')
      this.showAno(e)
    } else {
      console.log('in else')
      this.addAnnotation(e)
    }
  }

  render () {
    return (
      <div
        id='codeDisplayBox'
      >
        <CodeDisplay
          codeTitle={this.state.codeTitle}
          codeAuthor={this.state.codeAuthor}
          langSelect={this.state.langSelect}
          addOrShowAno={this.addOrShowAno}
          anoOrNot={this.anoOrNot}
        />

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
        <Overlay
          show={this.state.anoOverlayShow}
          placemant='right'
          container={this}
          target={this.state.anoOverlayTarget}
        >
          <ShowAno
            anoText={this.state.currentAno}
            addOrShowAno={this.addOrShowAno}
          />
        </Overlay>
      </div>
    )
  }
}

export default DisplayPage
