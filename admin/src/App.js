import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchWrapper from './components/SearchWrapper';
import './App.css';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Admin</h1>
          <SearchWrapper />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
