import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import { albumShape, richChoiceShape } from '../lib/PropTypesValues';

import AlbumPageHeader from './AlbumPageHeader';
import CurrentAlbum from './AlbumContent/CurrentAlbum';
import PreviousAlbum from './AlbumContent/PreviousAlbum';
import ChoiceContainer from './Choices/ChoiceContainer';
import StreamsterTitle from './AlbumHeaders/StreamsterTitle';

const helpers = {
  objectIsEmpty: obj => Object.keys(obj).length === 0 && obj.constructor === Object,
};

export default class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.renderSlidingSection = this.renderSlidingSection.bind(this);
    this.showPreviousAlbum = this.showPreviousAlbum.bind(this);
  }

  showPreviousAlbum() {
    if (helpers.objectIsEmpty(this.props.previousAlbum)) {
      return null;
    }
    return (
      <PreviousAlbum
        album={this.props.previousAlbum}
        richChoice={this.props.previousChoice}
      />
    );
  }
  renderSlidingSection() {
    return (
      /*<ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionAppearTimeout={600}
        className="temporary-slide-container"
        component="div"
      >*/
        <div key={this.props.album._id} className="album-page-global-album-container">
          {this.showPreviousAlbum()}
          <CurrentAlbum album={this.props.album} />
          <ChoiceContainer
            richChoices={this.props.richChoices}
            originAlbum={this.props.album}
          />
        </div>
      /*</ReactCSSTransitionGroup>*/
    );
  }
  render() {
    return (
      <div className="Album-Page">
        <Link to="/"><AlbumPageHeader /></Link>
        <StreamsterTitle classNameProp="album-page-ecouter-container">
          Essayez d'écouter
        </StreamsterTitle>
        {this.renderSlidingSection()}
      </div>
    );
  }
}

AlbumPage.defaultProps = {
  previousAlbum: {},
  previousChoice: [],
};

AlbumPage.propTypes = {
  album: PropTypes.shape(albumShape).isRequired,
  richChoices: PropTypes.arrayOf(PropTypes.shape(richChoiceShape)).isRequired,
  previousAlbum: PropTypes.shape(albumShape),
  previousChoice: PropTypes.shape(richChoiceShape),
};
