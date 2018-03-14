import React from 'react';
import PropTypes from 'prop-types';

import { albumShape, richChoiceShape } from '../../lib/PropTypesValues';

import AlbumContentHeader from './AlbumContentHeader';
import Choice from '../Choices/Choice';

const PreviousAlbum = ({ richChoice, album }) => (
  <div className=" Album-Page-Container Album-Page-Container-minimized">
    <AlbumContentHeader
      minimized
      albumName={album.name}
    />
    <Choice
      richChoice={richChoice}
      originAlbum={album}
      targetOrigin
    />
  </div>
);

PreviousAlbum.propTypes = {
  album: PropTypes.shape(albumShape).isRequired,
  richChoice: PropTypes.shape(richChoiceShape).isRequired,
};
export default PreviousAlbum;
