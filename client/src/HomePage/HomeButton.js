import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomeButton = ({
  children,
  link,
  toggleTransitionFromHome,
}) => (
  <Link to={link}>
    <div onClick={() => toggleTransitionFromHome()} className="button">
      <h3>{children}</h3>
    </div>
  </Link>
);

HomeButton.defaultProps = {
  toggleTransitionFromHome: () => null,
  link: '/',
};
HomeButton.propTypes = {
  link: PropTypes.string,
  children: PropTypes.string.isRequired,
  toggleTransitionFromHome: PropTypes.func,
};

export default HomeButton;
