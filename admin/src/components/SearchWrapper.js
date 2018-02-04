import React, { Component } from 'react';

import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};
export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistResults: [],
      albumsResults: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.renderAlbumResults = this.renderAlbumResults.bind(this);
    this.renderArtistResults = this.renderArtistResults.bind(this);
  }

  handleSearch = (query) => {
    fetch(`albums/search-spotify/${query}`)
      .then(res => res.json())
      .then(found => this.setState({ albumsResults: found.items }));
    fetch(`artists/search-spotify/${query}`)
      .then(res => res.json())
      .then(found => this.setState({ artistResults: found.items }));
  }
  renderAlbumResults = () => {
    if (this.state.albumsResults.length > 0) {
      return <ResultsContainer title="Albums Results" type="album" results={this.state.albumsResults} />;
    }
    return null;
  }
  renderArtistResults = () => {
    if (this.state.artistResults.length > 0) {
      return <ResultsContainer title="Artists Results" type="artist" results={this.state.artistResults} />;
    }
    return null;
  }
  render() {
    return (
      <div>
        <SearchContainer handleSearch={this.handleSearch} />
        <div style={style}>
          {this.renderAlbumResults()}
          {this.renderArtistResults()}
        </div>
      </div>
    );
  }
}
