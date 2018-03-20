import React from 'react';
import PropTypes from 'prop-types';

const style = {
  visibility: 'hidden',
}
const GoBack = (props, context) => (
  <div className="back-button-container" style={context.router.history.length > 2 ? {} : style}>
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
