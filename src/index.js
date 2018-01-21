import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

document.title = 'LRU – Learn, React, Understand'
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
