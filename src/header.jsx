import React from 'react'
import logo from './media/logo.gif'

const Header = ({title}) => (
  <header id='title'>
    <button id='homebtn' onClick={() => {
      window.location.href='/'
    }}>
      {title} &nbsp;
      <img id="logogif" alt="" src={logo}></img>
    </button>
  </header>
)

export default Header
