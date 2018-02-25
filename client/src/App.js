import React, { Component } from 'react';
import * as THREE from 'three';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import apiKey from './apiAuthentificate.js';
import ThreeBackground from './ThreeBackground';
import AlbumDisplay from './AlbumDisplay';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionFromHome: false,
      albums: [],
      counterHome: 0,
    };
    this.toggleTransitionFromHome = this.toggleTransitionFromHome.bind(this);
    this.incrementCountHome = this.incrementCountHome.bind(this);
  }
  /*componentDidMount() {
    fetch('/albums/', {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then(albums => this.setState({ albums: albums.map((el) => el._fields[0]) }));
  }*/
  toggleTransitionFromHome() {
    this.setState({
      transitionFromHome: !this.state.transitionFromHome,
    });
  }
  incrementCountHome() {
    this.setState({
      counterHome: this.state.counterHome += 1,
    });
  }
  render() {
    return (
      <div className="App">
        <ThreeBackground
          cubeRotation={this.state.cubeRotation}
          transitionFromHome={this.state.transitionFromHome}
          counterHome={this.state.counterHome}
          incrementCountHome={this.incrementCountHome}
        />
        <Route
          exact
          path="/"
          render={
            ({ location, match }) =>
              (<Home
                location={location}
                match={match}
                toggleTransitionFromHome={this.toggleTransitionFromHome}
              />)
          }
        />
        <Route path="/:id" component={AlbumDisplay} />
      </div>
    );
  }
}



export default App;
