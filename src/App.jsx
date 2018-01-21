import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import apiKey from './api-key.js'
import logo from './media/logo.gif'
var FileDrop = require("react-file-drop");

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
		let image = new Image()
		image.onload = () => {
			
			let context = this.refs.canvas.getContext('2d')
			context.imageSmoothingEnabled = false
			context.webfitImageSmoothingEnabled = false
			const ratio = Math.max(image.width/this.refs.canvas.width, image.height/this.refs.canvas.height)
			image.width = image.width/ratio
			image.height = image.height/ratio
			context.drawImage(image, 0, 0, image.width, image.height)
			context.strokeRect(this.props.rect.left/ratio, this.props.rect.top/ratio, this.props.rect.width/ratio, this.props.rect.height/ratio)
		}
		image.src=this.props.src
	}
}

class Uploader extends Component {
	state = {
		displayName: "myUploader"
	}
	
	render = () => {
		return(
			<div className="uploader">
				Drag your images here to upload...
				<FileDrop frame={document} onDrop={this.props.callback}>
					Drop some files here!
				</FileDrop>
			</div>
		);
	}
} 

class App extends Component {
  state = {
    title: 'LRU',
    score: 0,
    loading: false,
	num: 0
  }

  onFileSelected = async (files, event) => {
    this.setState({ loading: true })

    let images = [].concat.apply([], await Promise.all(
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
    ))
	
	images = _.shuffle(images)
    this.setState({ images, loading: false })
  }
  
  
  render = () => { 
    let picture
	if (this.state.loading){
		picture = <div> Loading... </div> 
	} else if (this.state.images) {
		if (this.state.images.length >0){
			picture = <div>
				<div id="score">SCORE: {this.state.score}</div>
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
					<div><button id="pass">Pass</button></div>
					<div className="w3-light-grey w3-round">
						<div className="w3-container w3-blue w3-round" style={{width: (this.state.num+1)*100/this.state.images.length+"%"}}>
						   {this.state.num+1}/{this.state.images.length}
						</div>
					</div>
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
		  className="inputfile"
		/>
		<label htmlFor="file"><strong>Choose a file</strong></label>

		<p>OR</p>
		<Uploader callback={this.onFileSelected}></Uploader>
	  </div>
	  
	}
	return (<div>
	  <header id='title'>
	  {this.state.title} &nbsp;
	  <img id="logogif" alt="" src={logo}></img>
	  </header>
	  {picture}
	</div>
	
	)
  }
}

export default App
