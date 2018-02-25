import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className="home-container" >
      <div className="home-headers-container">

        <h1
          className="home-header-part-1"
        >Electronic music<br /> for people who<br /> don&apos;t like
        <span className="home-header-part-2">electronic music</span>
        </h1>

      </div>
      <div className="home-button-container">
        <Link  to="/dsqdsq">
          <div onClick={() => props.toggleTransitionFromHome()} className="button">
            <h3>Le rock</h3>
          </div>
        </Link>
        <Link to="/dsjqklj">
          <div className="button">
            <h3>Le rap</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

Home.propTypes = {
  //: PropTypes.
};

export default Home;
