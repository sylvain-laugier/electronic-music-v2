import React from 'react';
import PropTypes from 'prop-types';

const SpotifyContainer = ({ url }) => (
  <div className="album-spotify-container" >
    <iframe
      src={`https://open.spotify.com/embed?uri=${url}?si=n6Ki-iE7Sg6gcpuywEnQCQ&theme=white`}
      width="340"
      height="340"
      frameBorder="0"
      allowTransparency
      title="spotify-wrapper"
    />
  </div>
);

SpotifyContainer.defaultProps = {
  url: '',
};

SpotifyContainer.propTypes = {
  url: PropTypes.string,
};

export default SpotifyContainer;
