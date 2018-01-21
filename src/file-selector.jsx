import React from 'react'
import Dropzone from 'react-dropzone'

const FileSelector = ({callback}) => (
  <div>
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
)

export default FileSelector
