import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Game from './game.jsx'
import About from './about.jsx'
import Disclaimer from './disclaimer.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'

class App extends Component {
  state = {
    title: 'LRU',
  }

  render = () => {
    return <div>
      <Header title={this.state.title} />
      <Switch>
        <Route exact path='/' component={Game} />
        <Route path='/about' component={About} />
        <Route path='/disclaimer' component={Disclaimer} />
      </Switch>
      <Footer />
    </div>
    }
}

export default App
