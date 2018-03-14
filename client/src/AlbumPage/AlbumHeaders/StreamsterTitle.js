import React from 'react';
import PropTypes from 'prop-types';

const StreamsterTitle = ({ children, classNameProp, style }) => (
  <div className={classNameProp}>
    <span style={style} className="streamster-title">
      {children}
    </span>
  </div>
);

StreamsterTitle.defaultProps = {
  classNameProp: null,
};

StreamsterTitle.propTypes = {
  children: PropTypes.string.isRequired,
  classNameProp: PropTypes.string,
};

export default StreamsterTitle;
