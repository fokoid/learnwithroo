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
    this.setState({ answer: null })
  }

  onPassClick = () => {
    if (this.state.answer !== null) {
      // continue
      this.props.advanceCallback(this.state.correct)
      this.setState({ answer: null })
    } else {
      // pass
      this.setState({ correct: false, answer: 'pass' })
    }
  }

  onClick = event => {
    const answer = event.target.id
    const correct = this.props.correctAnswers.includes(answer)
    this.setState({ correct, answer })
  }

  render = () => {
    const { image, rect, index, maxIndex, score } = this.props

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
          src={window.URL.createObjectURL(image)}
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
        </div>
        <div className="w3-light-grey w3-round">
          <div className="w3-container w3-blue w3-round" style={{width: (index)*100/maxIndex+"%"}}>
            {index}/{maxIndex}
          </div>
        </div>
        <div>
          <button id='restart' onClick={this.restart}>
            Start Again
          </button>
        </div>
      </div>
      )
}
}

export default Main
