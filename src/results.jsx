import React from 'react'

const Results = ({score, restartCallback}) => (
  <div id='results'>
    You scored {score} point{score !== 0 ? 's' : ''}!
    <div>
      <button id='restart' onClick={restartCallback}>
        Restart
      </button>
    </div>
  </div>
)

export default Results
