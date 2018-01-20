import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import apiKey from './api-key.js'

// max images imported at a time
// 20 picked to match per minute rate limit of Emotion API
const MAX_IMAGES = 20

const emotions = {
  happy: 'Happy',
  sad: 'Sad',
  disgust: 'Disgusted',
  surprise: 'Surprised',
  fear: 'Afraid',
  anger: 'Angry',
  contempt: 'Contempt',
  neutral: 'Neutral'
}

const getEmotions = image => fetch(
  'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': apiKey
    }),
    body: image
  }
).then(response => response.json())

class App extends Component {
  state = {
    title: 'empathizr',
    score: 0,
    loading: false
  }

  onFileSelected = async e => {
    this.setState({ loading: true })

    const images = [].concat.apply([], await Promise.all(
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

    this.setState({ images, loading: false })
  }

  render = () => (
    <div>
      <header id='title'>{this.state.title}</header>
      <p hidden={!this.state.loading}>Loading...</p>
      <div id='score'>{this.state.score}</div>
      <div id='input'>
        <input
          multiple
          type='file'
          id='files'
          onChange={this.onFileSelected}
        />
      </div>
      <div id='image'>
        { this.state.image && <img
          src={window.URL.createObjectURL(this.state.image)}
          alt='Test'
        />
        }
      </div>
      <div id='buttons'>
        {Object.keys(emotions).map(emotion => (
        <button key={emotion}>
          {emotions[emotion]}
        </button>
        ))}
        <button>Pass</button>
      </div>
    </div>
    )
}

export default App
