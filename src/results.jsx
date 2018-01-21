import React from 'react'

const Results = ({score, total, restartCallback}) => (
  <div id='results'>
    You scored <span id="score">{score}/{total}</span> point{score !== 1 ? 's' : ''}!
    <div>
      <button id='restart' onClick={restartCallback}>
        Restart
      </button>
    </div>
  </div>
)

export default Results
