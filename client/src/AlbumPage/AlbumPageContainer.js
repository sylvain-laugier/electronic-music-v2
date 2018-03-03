import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SpotifyContainer from './SpotifyContainer';

export default class AlbumPageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
    }
  }
  render() {
    return (
      <div className="Album-Page-Container">
        <div className="album-content-header-background" >
          <h2>{`${this.props.album.name} `}<br /> par</h2>
          <h3>{`${this.props.artist.name}`}</h3>
        </div>
        <div className="album-content-container" >
          <div className="album-cover">
            <img alt="" src={this.props.album.image}/>
          </div>
          <SpotifyContainer url={this.props.album.url}/>
        </div>
      </div>
    );
  }
}
