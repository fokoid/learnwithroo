import React from 'react'

const FileSelector = ({callback}) => (
  <div id='input'>
    <input
      multiple
      type='file'
      id='files'
      onChange={callback}
    />
  </div>
)

export default FileSelector
