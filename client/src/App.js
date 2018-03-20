import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ThreeBackground from './ThreeBackground';
import AlbumFetcher from './AlbumPage/AlbumFetcher';
import Home from './HomePage/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionFromHome: false,
      counterHome: 0,
    };
    this.toggleTransitionFromHome = this.toggleTransitionFromHome.bind(this);
  }

  toggleTransitionFromHome() {
    this.setState({
      transitionFromHome: !this.state.transitionFromHome,
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
        <div className="background" />
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
        <Route
          path="/:id"
          render={
            ({ location, match }) => {
              if (!this.state.transitionFromHome) {
                this.toggleTransitionFromHome();
              }
              return (<AlbumFetcher
                location={location}
                match={match}
                fromHome={this.state.transitionFromHome}
                toggleTransitionFromHome={this.toggleTransitionFromHome}
              />);
            }
          }
        />
      </div>
    );
  }
}


export default App;
