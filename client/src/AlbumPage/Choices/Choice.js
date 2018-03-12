import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PropTypesValue from '../../lib/PropTypesValues';

const { albumShape, artistShape, richChoiceShape } = PropTypesValue;

const Choice = ({
  originAlbum,
  originArtist,
  richChoice,
  targetOrigin,
}) => (
  <Link
    key={richChoice.targetObj._id}
    to={{
      pathname: targetOrigin ? `/${originAlbum._id}` : `/${richChoice.targetObj._id}`,
      state: {
        originAlbum,
        originArtist,
        richChoice: [richChoice],
      },
    }}
  >
    <div className="button button-album-page">
      <p>{richChoice.message}</p>
    </div>
  </Link>
);

Choice.defaultProps = {
  targetOrigin: false,
};

Choice.propTypes = {
  originAlbum: PropTypes.shape(albumShape).isRequired,
  originArtist: PropTypes.shape(artistShape).isRequired,
  richChoice: PropTypes.shape(richChoiceShape).isRequired,
  targetOrigin: PropTypes.bool,
};

export default Choice;
