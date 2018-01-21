import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import { getEmotions, rateLimit } from './emotion-api.js'
import Main from './main.jsx'
import Loading from './loading.jsx'
import Error from './error.jsx'
import FileSelector from './file-selector.jsx'

// max images imported at a time
// picked to match per minute rate limit of Emotion API
const MAX_IMAGES = rateLimit

class App extends Component {
  state = {
    title: 'empathizr',
    score: 0,
    loading: false,
    index: 0,
    images: null,
    error: null
  }

  onFileSelected = async e => {
    this.setState({ loading: true, error: null })

    const images = _.shuffle([].concat.apply([], await Promise.all(
      _.map(
        _.take(e.target.files, MAX_IMAGES),
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
      this.setState({ loading: false, images })
  }

  onButtonClick = e => {
    this.setState(({index}) => ({index: index + 1}))
  }

  render = () => {

    return <div>
      <header id='title'>{this.state.title}</header>
      {this.state.loading && <Loading />}
      {this.state.error && <Error message={this.state.error} />}
      {this.state.images && this.state.images.length > 0 && <Main
        image={this.state.images[this.state.index].image}
        rect={this.state.images[this.state.index].faceRectangle}
        index={this.state.index}
        maxIndex={this.state.images.length}
        score={this.state.score}
        onButtonClick={this.onButtonClick}
      />}
      {!this.state.loading && this.state.images === null && <FileSelector callback={this.onFileSelected} />}
    </div>
  }
}

export default App
