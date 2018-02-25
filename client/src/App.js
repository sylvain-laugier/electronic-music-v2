import React, { Component } from 'react';
import './App.css';

import apiKey from './apiAuthentificate.js';


class App extends Component {
  state = {albums: []}

  componentDidMount() {
    fetch('/albums/', {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then(albums => this.setState({ albums: albums.map((el) => el._fields[0]) }));
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}



export default App;
