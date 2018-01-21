import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import logo from './media/logo.gif'
import { getEmotions, rateLimit, emotionCutoff } from './emotion-api.js'
import Main from './main.jsx'
import Loading from './loading.jsx'
import Error from './error.jsx'
import Results from './results.jsx'
import FileSelector from './file-selector.jsx'

// max images imported at a time
// picked to match per minute rate limit of Emotion API
const MAX_IMAGES = rateLimit

const objectMax = obj => Object.keys(obj).reduce(
  (a, b) => obj[a] > obj[b] ? a : b
)

const objectNMax = (obj, n) => {
  if (n === 0 || Object.keys(obj).length === 0)
    return []
  const first = objectMax(obj)
  return [first].concat(
    objectNMax(_.omit(obj, first), n-1)
  )
}

class App extends Component {
  state = {
    title: 'LRU',
    score: 0,
    loading: false,
    index: 0,
    done: false,
    images: null,
    error: null
  }

  onFileSelected = async (files, event) => {
    this.setState({ loading: true, error: null })

    const images = _.shuffle([].concat.apply([], await Promise.all(
      _.map(
        _.take(files, MAX_IMAGES),
        async image => _.map(
          await getEmotions(image),
          ({faceRectangle, scores}) => ({
            image,
            faceRectangle,
            scores
          })
        )
      )
    )))

    if (images.length === 0)
      this.setState({
        error: 'An error occurred while processing images.'
      })
    else
      this.setState({ loading: false, index: 0, images })
  }

  restart = () => {
    console.log('restarting')
    this.setState({done: false, images: null, index: 0, score: 0})
  }

  advance = correct => {
    this.setState(({images, index, score}) => {
      index += 1
      if (correct) score += 1
      if (index === images.length) {
      // completed quiz :)
        return {done: true, score}
      }
      return {index, score}
    })
  }

  render = () => {
    return <div>
      <header id='title'>
    {this.state.title} &nbsp;
    <img id="logogif" alt="" src={logo}></img>
    </header>
      {this.state.loading && <Loading />}
      {this.state.error && <Error message={this.state.error} />}
      {!this.state.done && this.state.images && this.state.images.length > 0 && <Main
        image={this.state.images[this.state.index].image}
        rect={this.state.images[this.state.index].faceRectangle}
        correctAnswers={objectNMax(_.pickBy(
          this.state.images[this.state.index].scores,
          val => val > emotionCutoff
        ), 2)}
        index={this.state.index}
        maxIndex={this.state.images.length}
        score={this.state.score}
        advanceCallback={this.advance}
      />}
      {this.state.done && <Results score={this.state.score} restartCallback={this.restart} />}
      {!this.state.loading && this.state.images === null && <FileSelector callback={this.onFileSelected} />}
    </div>
    }
}

export default App
