import React from 'react';
import PropTypes from 'prop-types';

const PinkTitle = ({ title, classNameProp }) => (
  <div className={classNameProp}>
    <h1>{title} </h1>
  </div>
);

PinkTitle.defaultProps = {
  classNameProp: 'album-page-ecouter-container',
};

PinkTitle.propTypes = {
  title: PropTypes.string.isRequired,
  classNameProp: PropTypes.string,
};

export default PinkTitle;
