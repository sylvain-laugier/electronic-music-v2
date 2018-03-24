import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import { albumShape, richChoiceShape } from '../lib/PropTypesValues';

import AlbumPageHeader from './AlbumPageHeader';
import CurrentAlbum from './AlbumContent/CurrentAlbum';
import ChoiceContainer from './Choices/ChoiceContainer';
import StreamsterTitle from './AlbumHeaders/StreamsterTitle';
import GoBack from './Choices/GoBack';

const helpers = {
  objectIsEmpty: obj => Object.keys(obj).length === 0 && obj.constructor === Object,
};

export default class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.renderSlidingSection = this.renderSlidingSection.bind(this);
    this.setReverseAnim = this.setReverseAnim.bind(this);
    this.state = {
      reverseAnim: true,
    };
  }
  setReverseAnim(bool, cb) {
    this.setState({
      reverseAnim: bool,
    }, () => cb());
  }
  renderSlidingSection() {
    return (
      <ReactCSSTransitionGroup
        transitionName={this.state.reverseAnim ? 'albumAnimationLeft' : 'albumAnimationRight'}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionAppearTimeout={600}
        transitionAppear
        className="temporary-slide-container"
        component="div"
      >
        <div key={this.props.album._id} className="transistion-slide-container">
          <div className="album-page-global-album-container">
            <GoBack display={this.props.goBackButton}setReverseAnim={this.setReverseAnim} />
            <CurrentAlbum album={this.props.album} />
            <ChoiceContainer
              richChoices={this.props.richChoices}
              originAlbum={this.props.album}
              setReverseAnim={this.setReverseAnim}
            />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
  render() {
    return (
      <div className="Album-Page">
        <Link to="/"><AlbumPageHeader /></Link>
        <StreamsterTitle classNameProp="album-page-ecouter-container">
          Try To Listen To...
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
  goBackButton: PropTypes.bool.isRequired,
};
