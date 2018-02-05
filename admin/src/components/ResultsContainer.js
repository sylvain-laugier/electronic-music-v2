import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Album from './Album';
import Artist from './Artist';

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.renderResults = this.renderResults.bind(this);
  }
  renderResults = () => {
    let results = this.props.results;
    if (this.props.type === 'album') {
      return results.map(album =>
        <Album key={album.id} album={album} spotifyChecked={this.props.spotifyChecked} />)
    }
    if (this.props.type === 'artist') {
      return results.map(artist =>
        <Artist key={artist.id} artist={artist} spotifyChecked={this.props.spotifyChecked} />)
    }
    return null;
  }
  render() {
    return (
      <div style={{ width: '50%' }}>
        <h1>{this.props.title}</h1>
        <div style={style}>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}
