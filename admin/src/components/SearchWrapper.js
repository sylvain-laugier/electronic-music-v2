import React, { Component } from 'react';

import SearchContainer from './SearchContainer';


export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistResults: [],
      albumsResults: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (query) => {
    fetch(`albums/search-spotify/${query}`)
      .then(res => res.json())
      .then(found => this.setState({albumsResults: found.items}));
  }
  render() {
    return (
      <div>
        <SearchContainer handleSearch={this.handleSearch} />
        {this.state.albumsResults.map(albums =>
          <div key={albums.id}>{albums.name}</div>
        )}
      </div>
    );
  }
}
