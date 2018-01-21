import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import { getEmotions, emotionNames, rateLimit } from './emotion-api.js'
import FocusImage from './focus-image.jsx'

// max images imported at a time
// picked to match per minute rate limit of Emotion API
const MAX_IMAGES = rateLimit

class App extends Component {
  state = {
    title: 'empathizr',
    score: 0,
    loading: false,
    error: false,
    index: 0,
    images: null
  }

  onFileSelected = async e => {
    this.setState({ loading: true })

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

    this.setState({ loading: false, images })
  }

  onButtonClick = e => void this.setState(({index}) => ({index: index + 1}))

  render = () => {
    let picture
    if (this.state.loading){
      picture = <div> Loading </div> 
    } else if (this.state.images === null) {
      picture = <div id='input'>
        <input
          multiple
          type='file'
          id='files'
          onChange={this.onFileSelected}
        />
      </div>
    } else {
        picture = <div>
          <div id='progress'>{this.state.index + 1}/{this.state.images.length}</div>
          <div id='score'>{this.state.score}</div>
          <FocusImage
            src={window.URL.createObjectURL(this.state.images[this.state.index].image)}
            rect={this.state.images[this.state.index].faceRectangle}
            width={300}
            height={300}
          />
          <div id='buttons'>
            {Object.keys(emotionNames).map(emotion => (
            <button key={emotion} onClick={this.onButtonClick}>
              {emotionNames[emotion]}
            </button>
            ))}
            <button>Pass</button>
          </div>
        </div>
        }

    return (<div>
      <header id='title'>{this.state.title}</header>
      {picture}
    </div>
    )
  }
}

export default App
