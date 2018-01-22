import React from 'react'
import Dropzone from 'react-dropzone'

const FileSelector = ({fileCallback, urlCallback}) => (
  <div>
    <div style={{margin:"20px"}}>
      <h4>Please select an image source</h4>
    </div>
    <div id='input'>
      <button id="photolib" onClick={urlCallback}>
        Curated Collections
      </button>
      <p>OR</p>
      <Dropzone id='uploader' accept='image/*' onDrop={fileCallback}>
        <p>Drop images here, or click to select images.</p>
      </Dropzone>
    </div>
  </div>
)

export default FileSelector
