import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ThreeBackground from './ThreeBackground';
import AlbumPage from './AlbumPage/AlbumPage';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionFromHome: false,
      counterHome: 0,
    };
    this.toggleTransitionFromHome = this.toggleTransitionFromHome.bind(this);
    this.incrementCountHome = this.incrementCountHome.bind(this);
  }

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
        <Route
          path="/:id"
          render={
            ({ location, match }) => {
              if (!this.state.transitionFromHome) {
                this.toggleTransitionFromHome();
              }
              return (<AlbumPage
                location={location}
                match={match}
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
