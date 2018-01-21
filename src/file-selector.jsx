import React from 'react'
import Dropzone from 'react-dropzone'

const FileSelector = ({callback}) => (
  <div class="row">
    <div class="column">
      <div style={{margin:"20px"}}><h3> <b>L</b>earn. <b>R</b>eact. <b>U</b>nderstand. </h3></div>
      <div>
      </div>
    </div>
    <div class="column">
      <div style={{margin:"20px"}}><h4> Select your image source for the game: </h4></div>
      <div id='input'>
        <button id="photolib">
          Curated Collections
        </button>
        <p>OR</p>
        <Dropzone id='uploader' accept='image/*' onDrop={callback}>
          <p>Drop images here, or click to select images.</p>
        </Dropzone>
      </div>
    </div>
  </div>
)

export default FileSelector
