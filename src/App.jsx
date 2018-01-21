import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import logo from './media/logo.gif'
import Game from './game.jsx'
import About from './about.jsx'

class App extends Component {
  state = {
    title: 'LRU',
  }

  render = () => {
    return <div>
      <header id='title'>
        <button id='homebtn' onClick={this.restart}>
          {this.state.title} &nbsp;
          <img id="logogif" alt="" src={logo}></img>
        </button>
      </header>
      <Switch>
        <Route exact path='/' component={Game} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
    }
}

export default App
