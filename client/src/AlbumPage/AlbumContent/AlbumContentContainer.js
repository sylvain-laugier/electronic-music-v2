import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SpotifyContainer from './SpotifyContainer';

export default class AlbumContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="album-content-container" >
        <div className="album-cover">
          <img alt="" src={this.props.album.image}/>
        </div>
        <SpotifyContainer url={this.props.album.url}/>
      </div>
    )
  }
}
