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

class CroppedImage extends Component {
	state = {
		image: null
	}
	
	render = () => {
		return <canvas ref="canvas"></canvas>
	}
	
	componentDidMount = () => {
		const image = new Image()
		image.onload = () => {
			const context = this.refs.canvas.getContext('2d')
			console.log(image.width, image.height, 300*image.width/image.height)
			context.drawImage(image, 0, 0, image.width, image.height, 0, 0, 300*image.width/image.height, 300)
		}
		image.src=this.props.src
	}
}

class App extends Component {
  state = {
    title: 'empathizr',
    score: 0,
    loading: false,
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
				<CroppedImage hidden ref="image"
				  src={window.URL.createObjectURL(this.state.images[this.state.num].image)}
				  rect={this.state.images[this.state.num].faceRectangle}
				  alt='Test'
				/>
				<div id='buttons'>
				{Object.keys(emotions).map(emotion => (
				<button key={emotion}>
				  {emotions[emotion]}
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
