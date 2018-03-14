import React from 'react';
import PropTypes from 'prop-types';

import { albumShape } from '../../lib/PropTypesValues';

import AlbumContentHeader from './AlbumContentHeader';
import AlbumContentContainer from './AlbumContentContainer';

const CurrentAlbum = ({ album }) => (
  <div className="Album-Page-Container">
    <AlbumContentHeader
      albumName={album.name}
      artistName={album.artistName}
    />
    <AlbumContentContainer
      imageUrl={album.image}
      spotifyUrl={album.url}
    />
  </div>
);

CurrentAlbum.propTypes = {
  album: PropTypes.shape(albumShape).isRequired,
};

export default CurrentAlbum;
