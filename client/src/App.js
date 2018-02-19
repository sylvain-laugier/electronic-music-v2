import React, { Component } from 'react';
import './App.css';
import apiKey from './apiAuthentificate.js';

class App extends Component {
  state = {albums: []}

  componentDidMount() {
    fetch('/albums/', {
      method: 'GET',
      headers: new Headers(apiKey()),
    })
      .then(res => res.json())
      .then(albums => this.setState({ albums: albums.map((el) => el._fields[0]) }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.albums.map(user =>
          <div key={user.properties._id}>{user.properties.name}</div>
        )}
      </div>
    );
  }
}

export default App;
