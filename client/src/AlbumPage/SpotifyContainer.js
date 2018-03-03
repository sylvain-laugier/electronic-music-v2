import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SpotifyContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
    }
  }
  render() {
    return (
      <div className="album-spotify-container" >
        <iframe
          src={`https://open.spotify.com/embed?uri=${this.props.url}?si=n6Ki-iE7Sg6gcpuywEnQCQ&theme=white`}
          width="340"
          height="340"
          frameBorder="0"
          allowTransparency
          title="spotify-wrapper"
        />
      </div>
    );
  }
}
