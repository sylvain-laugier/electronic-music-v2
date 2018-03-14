import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { albumShape, richChoiceShape } from '../../lib/PropTypesValues';

const Choice = ({
  originAlbum,
  richChoice,
  targetOrigin,
}) => (
  <Link
    to={{
      pathname: targetOrigin ? `/${originAlbum._id}` : `/${richChoice.targetObj._id}`,
      state: {
        originAlbum,
        richChoice,
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
  richChoice: PropTypes.shape(richChoiceShape).isRequired,
  targetOrigin: PropTypes.bool,
};

export default Choice;
