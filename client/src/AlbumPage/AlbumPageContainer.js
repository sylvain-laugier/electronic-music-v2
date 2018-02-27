import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AlbumPageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      album: {}
    }
  }
  render() {
    return (
      <div className="album-page-container">
        <div className="album-content-header-background" >
          <h2>{`${this.props.album.name} `}<br /><span>{`${this.props.artist.name}`}</span></h2>
        </div>
        <div className="album-content-container" >
          <div className="album-cover">
            <img alt="" src={this.props.album.image}/>
          </div>
          <div className="album-spotify-container" >
            <iframe
              src={`https://open.spotify.com/embed?uri=${this.props.album.url}?si=n6Ki-iE7Sg6gcpuywEnQCQ&theme=white`}
              width="300"
              height="315"
              frameBorder="0"
              allowTransparency
              title="spotify-wrapper"
            />
          </div>
        </div>
      </div>
    );
  }
}
