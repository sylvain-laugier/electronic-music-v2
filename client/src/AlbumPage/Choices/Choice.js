import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { albumShape, richChoiceShape } from '../../lib/PropTypesValues';

const Choice = ({
  originAlbum,
  richChoice,
  targetOrigin,
}, context) => (
  <Link
    to={{
      pathname: targetOrigin ? null : `/${richChoice.targetObj._id}`,
      state: {
        originAlbum,
        richChoice,
      },
    }}
    onClick={targetOrigin ? context.router.history.goBack : null}
  >
    <div className="button button-album-page">
      <p>{richChoice.message}</p>
    </div>
  </Link>
);

Choice.defaultProps = {
  targetOrigin: false,
};

Choice.contextTypes = {router: PropTypes.object};

Choice.propTypes = {
  originAlbum: PropTypes.shape(albumShape).isRequired,
  richChoice: PropTypes.shape(richChoiceShape).isRequired,
  targetOrigin: PropTypes.bool,
};

export default Choice;
