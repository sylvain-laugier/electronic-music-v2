import React from 'react';
import PropTypes from 'prop-types';

import SpotifyContainer from './SpotifyContainer';

const AlbumContentContainer = ({ imageUrl, spotifyUrl }) => (
  <div className="album-content-container" >
    <div className="album-cover">
      <img alt="" src={imageUrl} />
    </div>
    <SpotifyContainer url={spotifyUrl} />
  </div>
);

AlbumContentContainer.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  spotifyUrl: PropTypes.string.isRequired,
};
export default AlbumContentContainer;
