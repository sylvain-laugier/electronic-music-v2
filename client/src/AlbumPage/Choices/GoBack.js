import React from 'react';
import PropTypes from 'prop-types';


const GoBack = (props, context) => (
  props.display ?
  <div className="back-button-container">
    <div
      className="button back-button"
      onClick={() => (
        props.setReverseAnim(true, () => context.router.history.goBack())
      )}
    >
      <p>&lsaquo;&ndash;</p>
    </div>
  </div> :
    null
);

GoBack.contextTypes = { router: PropTypes.object };

GoBack.propTypes = {
  display: PropTypes.bool.isRequired,
};

export default GoBack;
