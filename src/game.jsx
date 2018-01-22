import React, {Component} from 'react'
import _ from 'lodash'
import { getEmotions, getEmotionsFromUrl, rateLimit, emotionCutoff } from './emotion-api.js'
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

class Game extends Component {
  state = {
    score: 0,
    loading: false,
    index: 0,
    done: false,
    images: null,
    error: null
  }

  onCollectionSelected = async () => {
    const urls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `https://learn-react-understand.firebaseapp.com/collections/basic/${i}.jpg`)
    console.log(urls)
    const images = _.shuffle([].concat.apply([], await Promise.all(
      _.map(
        _.take(urls, MAX_IMAGES),
        async url => _.map(
          await getEmotionsFromUrl(url),
          ({faceRectangle, scores}) => ({
            url,
            faceRectangle,
            scores
          })
        )
      )
    )))
    console.log(images)

    if (images.length === 0)
      this.setState({
        error: 'No faces were found among the images provided.'
      })
    else
      this.setState({ loading: false, index: 0, images })
  }

  onFileSelected = async (files, event) => {
    this.setState({ loading: true, error: null })

    if (files.length === 0) {
      this.setState({
        error: 'No images found.'
      })
      return
    }

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
    console.log(images)

    if (images.length === 0)
      this.setState({
        error: 'No faces were found among the images provided.'
      })
    else
      this.setState({ loading: false, index: 0, images })
  }

  restart = () => {
    this.setState({
      done: false,
      error: false,
      loading: false,
      images: null,
      index: 0,
      score: 0
    })
  }

  advance = correct => {
    console.log('Entering advance:', this.state)
    this.setState(({images, index, score}) => {
      if (correct) score += 1
      if (index > images.length) {
        // completed quiz :)
        return {done: true, score}
      }
      return {index: index+1, score}
    })
    console.log('Leaving advance:', this.state)
  }

  render = () => {
    console.log(this.state.index)
    return (
    <div>
      {this.state.loading && !this.state.error && <Loading />}
      {this.state.error && <Error message={this.state.error} restartCallback={this.restart} />}
      {this.state.images && this.state.index < this.state.images.length && this.state.images.length > 0 && <Main
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
        restartCallback={this.restart}
      />}
      {this.state.images && this.state.index >= this.state.images.length && <Results score={this.state.score} restartCallback={this.restart} total={this.state.images.length} />}
      {!this.state.loading && this.state.images === null && <FileSelector urlCallback={this.onCollectionSelected} fileCallback={this.onFileSelected} />}
      <p>
        This is a tool to help autistic children learn to recognize emotions.
        You can read more on the <a href='/about'>about page</a>.
      </p>
    </div>
    )
  }
}

export default Game
