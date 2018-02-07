import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      albumsResults: [],
      spotifyChecked: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.renderAlbumResults = this.renderAlbumResults.bind(this);
    this.updateSpotifyChecked = this.updateSpotifyChecked.bind(this);
  }

  handleSearch = (query) => {
    fetch(`/albums/search-spotify/${query}`)
      .then(res => res.json())
      .then(found => this.setState({ albumsResults: found.items }));
  }
  updateSpotifyChecked() {
    this.setState({
      spotifyChecked: !this.state.spotifyChecked,
    });
  }
  renderAlbumResults = () => {
    if (this.state.albumsResults.length > 0) {
      return (
        <ResultsContainer
          title="Albums Results"
          type="album"
          results={this.state.albumsResults}
          spotifyChecked={this.state.spotifyChecked}
          isUnderManagement={this.props.isUnderManagement}
          addRelationship={this.props.addRelationship}
        />);
    }
    return null;
  }
  render() {
    return (
      <div>
        <SearchContainer
          handleSearch={this.handleSearch}
          spotifyChecked={this.state.spotifyChecked}
          updateSpotifyChecked={this.updateSpotifyChecked}
        />
        <div style={style}>
          {this.renderAlbumResults()}
        </div>
      </div>
    );
  }
}

SearchWrapper.defaultProps = {
  isUnderManagement: false,
  addRelationship: () => null,
};

SearchWrapper.propTypes = {
  isUnderManagement: PropTypes.bool,
  addRelationship: PropTypes.func,
};
