import React from 'react';
import PropTypes from 'prop-types';

import HomeButton from './HomeButton';
import HomeFooter from './HomeFooter';

const Home = props => (
  <div className="home-container" >
    <div className="home-headers-container">

      <h1
        className="home-header-part-1"
      >Electronic music<br /> for people who<br /> don&apos;t like
      <span className="home-header-part-2">electronic music</span>
      </h1>

    </div>
    <div className="explanation-container">
      <h2>Welcome to this personnal guide to discovering electronic music. Please choose below a genre that you like and follow through</h2>
    </div>
    <div className="home-button-container">
      <HomeButton
        toggleTransitionFromHome={props.toggleTransitionFromHome}
        link="/7dxKtc08dYeRVHt3p9CZJn"
      > I like Rock
      </HomeButton>
      <HomeButton
        toggleTransitionFromHome={props.toggleTransitionFromHome}
        link="/7dxKtc08dYeRVHt3p9CZJn"
      > I like Rap
      </HomeButton>
      <HomeButton
        toggleTransitionFromHome={props.toggleTransitionFromHome}
        link="/7dxKtc08dYeRVHt3p9CZJn"
      > I like Metal
      </HomeButton>
      <HomeButton
        toggleTransitionFromHome={props.toggleTransitionFromHome}
        link="/7dxKtc08dYeRVHt3p9CZJn"
      > I like Daft Punk
      </HomeButton>
    </div>
    <HomeFooter />
  </div>
);

Home.propTypes = {
  toggleTransitionFromHome: PropTypes.func.isRequired,
};

export default Home;
