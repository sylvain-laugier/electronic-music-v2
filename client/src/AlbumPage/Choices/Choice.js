import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { albumShape, richChoiceShape } from '../../lib/PropTypesValues';

const Choice = ({
  richChoice,
  setReverseAnim,
}, context) => (
    <div
      className="button button-album-page"
      onClick={() => (
        setReverseAnim(false, () => context.router.history.push(`/${richChoice.targetObj._id}`))
      )}
    >
      <p>{richChoice.message}</p>
    </div>
);

Choice.defaultProps = {
  targetOrigin: false,
};

Choice.contextTypes = { router: PropTypes.object };

Choice.propTypes = {
  originAlbum: PropTypes.shape(albumShape).isRequired,
  richChoice: PropTypes.shape(richChoiceShape).isRequired,
  targetOrigin: PropTypes.bool,
};

export default Choice;
