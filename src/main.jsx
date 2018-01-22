import React, {Component} from 'react'
import { emotionNames } from './emotion-api.js'
import FocusImage from './focus-image.jsx'

class Main extends Component {
  state = {
    answer: null,
    correct: null
  }

  answerMessage = () => (
    this.state.correct
    ? `Yes, it's ${this.state.answer}!`
    : `Actually, it's ${this.props.correctAnswers[0]}.`
  )

  componentWillReceiveProps = () => {
    this.setState({ answer: null, correct: null })
  }

    /*  componentDidMount = () => {
    this.setState({ imageUrl: window.URL.createObjectURL(this.props.image) })
  }
  componentDidUpdate = () => {
    this.setState({ imageUrl: window.URL.createObjectURL(this.props.image) })
  }*/

  onPassClick = () => {
    console.log('Entering onPassClick:', this.props, this.state)
    if (this.state.answer !== null) {
      // continue
      console.log('Calling advance from onPassClick:', this.props, this.state)
      this.props.advanceCallback(this.props, this.state.correct)
      this.setState({ answer: null })
    } else {
      // pass
      this.setState({ correct: false, answer: 'pass' })
    }
    console.log('Leaving onPassClick:', this.props, this.state)
  }

  onClick = event => {
    console.log('Entering onClick:', this.props, this.state)
    const answer = event.target.id
    const correct = this.props.correctAnswers.includes(answer)
    this.setState({ correct, answer })
    console.log('Leaving onClick:', this.props, this.state)
  }

  render = () => {
    const { rect, index, maxIndex, score } = this.props

    const buttonClass = emotion => {
      if (this.state.answer === null) return undefined
      if (this.state.correct && this.state.answer === emotion) return 'correct'
      if (this.props.correctAnswers[0] === emotion) return 'correct'
      if (this.state.answer === emotion) return 'incorrect'
      return 'disabled'
    }

    return (
      <div>
        <div id='score'>SCORE: {score}</div>
        <FocusImage
          src={window.URL.createObjectURL(this.props.image)}
          rect={rect}
          width={300}
          height={300}
        />
        <div id='answer'>
          {this.state.answer !== null ? this.answerMessage() : <br/> }
        </div>
        <div id='buttons'>
          {Object.keys(emotionNames).map(emotion => (
          <button
            disabled={this.state.answer !== null}
            id={emotion}
            key={emotion}
            onClick={this.onClick}
            className={buttonClass(emotion)}
          >
            {emotionNames[emotion]}
          </button>
          ))}
        </div>
        <div>
          <button id='pass' onClick={this.onPassClick}>
            {this.state.answer === null ? 'Pass' : 'Continue'}
          </button>
          <button id='restart' onClick={this.props.restartCallback}>
            Start Again
          </button>
        </div>
        <div className="w3-light-grey w3-round">
          <div className="w3-container w3-blue w3-round" style={{width: (index)*100/maxIndex+"%"}}>
            {index}/{maxIndex}
          </div>
        </div>
      </div>
      )
}
}

export default Main
