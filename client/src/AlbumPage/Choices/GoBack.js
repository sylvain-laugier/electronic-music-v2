import React from 'react';
import PropTypes from 'prop-types';

const GoBack = (props, context) => (
  <div className="back-button-container">
    <div
      className="button back-button"
      onClick={() => (
        props.setReverseAnim(true, () => context.router.history.goBack())
      )}
    >
      <p>&lsaquo;&ndash;</p>
    </div>
  </div>
);

GoBack.contextTypes = { router: PropTypes.object };


export default GoBack;
