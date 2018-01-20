import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

class App extends Component {
  state = {
	  title: 'facehaste.com',
	  image: {
		  url: logo,
		  emotion: 'happy'
	  },
	  score: 0
  }
  render = () => (
	<div>
		<header id='title'>{this.state.title}</header>
		<div id='score'>{this.state.score}</div>
		<div id='image'>
		    <img src={this.state.image.url} />
		</div>
		<div id='buttons'>
		{Object.keys(emotions).map(emotion => (
		    <button>{emotions[emotion]}</button>
		))}
		<button>Pass</button>
		</div>
	</div>
  )
}

export default App;
