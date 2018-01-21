import React from 'react'
import { emotionNames } from './emotion-api.js'
import FocusImage from './focus-image.jsx'

const Main = ({
  image, rect,
  index, maxIndex,
  score,
  onButtonClick
}) => (
  <div>
    <div id='progress'>{index + 1}/{maxIndex}</div>
    <div id='score'>{score}</div>
    <FocusImage
      src={window.URL.createObjectURL(image)}
      rect={rect}
      width={300}
      height={300}
    />
    <div id='buttons'>
      {Object.keys(emotionNames).map(emotion => (
      <button key={emotion} onClick={onButtonClick}>
        {emotionNames[emotion]}
      </button>
      ))}
      <button>Pass</button>
    </div>
  </div>
)

export default Main
