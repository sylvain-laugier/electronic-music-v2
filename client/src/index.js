import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AlbumDisplay from './AlbumDisplay';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import ThreeBackground from './ThreeBackground';

ReactDOM.render(
  <Router>
    <div>
      <ThreeBackground />
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={AlbumDisplay} />
      </App>
    </div>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
