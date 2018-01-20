import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import { getEmotions, emotionNames, rateLimit } from './emotion-api.js'
import FocusImage from './focus-image.js'

// max images imported at a time
// picked to match per minute rate limit of Emotion API
const MAX_IMAGES = rateLimit

class App extends Component {
  state = {
    title: 'empathizr',
    score: 0,
    loading: false,
    error: false,
    num: 0
  }

  onFileSelected = async e => {
    this.setState({ loading: true })

    let images = [].concat.apply([], await Promise.all(
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
    ))

    images = _.shuffle(images)
    this.setState({ images, loading: false })
  }

  render = () => {
    let picture
    if (this.state.loading){
      picture = <div> Loading </div> 
    } else if (this.state.images) {
      if (this.state.images.length >0){

        picture = <div>
          <div id='progress'>{this.state.num+1}/{this.state.images.length}</div>
          <div id='score'>{this.state.score}</div>
          <FocusImage
            src={window.URL.createObjectURL(this.state.images[this.state.num].image)}
            rect={this.state.images[this.state.num].faceRectangle}
            width={300}
            height={300}
          />
          <div id='buttons'>
            {Object.keys(emotionNames).map(emotion => (
            <button key={emotion}>
              {emotionNames[emotion]}
            </button>
            ))}
            <button>Pass</button>
          </div>
        </div>
        } else {
          picture = <div> No faces found! Please try again! </div>
          }
    } else  {
      picture = <div id='input'>
        <input
          multiple
          type='file'
          id='files'
          onChange={this.onFileSelected}
        />
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
