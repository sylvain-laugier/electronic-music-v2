import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import PropTypesValue from '../lib/PropTypesValues';

import AlbumPageHeader from './AlbumPageHeader';
import AlbumPageContainer from './AlbumContent/AlbumPageContainer';
import ChoiceContainer from './Choices/ChoiceContainer';
import PinkTitle from './AlbumHeaders/PinkTitle';

const { albumShape, artistShape, richChoiceShape } = PropTypesValue;
const helpers = {
  objectIsEmpty: obj => Object.keys(obj).length === 0 && obj.constructor === Object,
};

export default class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.renderSlidingSection = this.renderSlidingSection.bind(this);
    this.testForEmptyState = this.testForEmptyState.bind(this);
  }

  testForEmptyState() {
    if (helpers.objectIsEmpty(this.props.previousAlbum)) {
      return null;
    }
    return (
      <AlbumPageContainer
        minimized
        album={this.props.previousAlbum}
        artist={this.props.previousArtist}
        richChoice={this.props.previousChoice}
      />
    );
  }
  renderSlidingSection() {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionAppearTimeout={600}
        className="temporary-slide-container"
        component="div"
      >
        <div key={this.props.album._id} className="album-page-global-album-container">
          {this.testForEmptyState()}
          <AlbumPageContainer album={this.props.album} artist={this.props.artist} />
          <ChoiceContainer
            richChoices={this.props.richChoices}
            originAlbum={this.props.album}
            originArtist={this.props.artist}
          />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
  render() {
    return (
      <div className="Album-Page">
        <Link to="/"><AlbumPageHeader /></Link>
        <PinkTitle title="Essayez d'écouter" />
        {this.renderSlidingSection()}
      </div>
    );
  }
}

AlbumPage.defaultProps = {
  previousAlbum: {},
  previousArtist: {},
  previousChoice: [],
};

AlbumPage.propTypes = {
  album: PropTypes.shape(albumShape).isRequired,
  artist: PropTypes.shape(artistShape).isRequired,
  richChoices: PropTypes.arrayOf(PropTypes.shape(richChoiceShape)).isRequired,
  previousAlbum: PropTypes.shape(albumShape),
  previousArtist: PropTypes.shape(artistShape),
  previousChoice: PropTypes.arrayOf(PropTypes.shape(richChoiceShape)),
};
