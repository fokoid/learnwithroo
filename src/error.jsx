import React from 'react'

const Error = ({message, restartCallback}) => <div id='error'>
  <p>{message}</p>
  <p>Please try again, or choose some different images.</p>
  <div>
    <button id='restart' onClick={restartCallback}>
      Go Back
    </button>
  </div>
</div>

export default Error
