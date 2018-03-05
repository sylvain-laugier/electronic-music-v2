import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import apiKey from '../apiAuthentificate';

import AlbumPageHeader from './AlbumPageHeader';
import AlbumPageContainer from './AlbumContent/AlbumPageContainer';
import ChoiceContainer from './AlbumContent/ChoiceContainer';

export default class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      artist: {},
      previousAlbum: {},
      previousArtist: {},
      richChoices: [],
      newLoading: true,
      activeMode: true,
    };
    this.updateComponent = this.updateComponent.bind(this);
    this.renderSlidingSection = this.renderSlidingSection.bind(this);
    this.testForEmptyState = this.testForEmptyState.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.updateComponent(this.props), 100);

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        newLoading: true,
        previousAlbum: nextProps.location.state ? nextProps.location.state.originAlbum : {},
        previousArtist: nextProps.location.state ? nextProps.location.state.originArtist : {},
      }, () => this.updateComponent(nextProps));
    }
  }
  updateComponent(props) {
    this.setState({
      newLoading: false,
    });
    fetch(`/albums/${props.match.params.id}`, {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then(album => this.setState({ album }));
    fetch(`/albums/artist/${props.match.params.id}`, {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then(artist => this.setState({ artist }));
    fetch(`/albums/related/${props.match.params.id}`, {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then((destinations) => {
        fetch(`/albums/relationships/${props.match.params.id}`, {
          method: 'GET',
          headers: new Headers(apiKey),
        })
          .then(res => res.json())
          .then((choices) => {
            if (choices.length > 0) {
              const richChoices = choices
                .map(choice => choice._fields[0])
                .map((choice) => {
                  const relativeDestination = destinations
                    .map(destination => destination._fields[0])
                    .find(destination => choice.end.low === destination.identity.low);
                  return ({
                    message: choice.properties.message,
                    targetObj: relativeDestination.properties,
                  });
                });
              this.setState({
                richChoices,
              });
            } else {
              this.setState({
                richChoices: [],
              });
            }
          });
      });
  }
  testForEmptyState() {
    if (Object.keys(this.state.previousAlbum).length === 0 && this.state.previousAlbum.constructor === Object) {
      return null;

    }
    return (
      <AlbumPageContainer
        minimized
        album={this.state.previousAlbum}
        artist={this.state.previousArtist}
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
        <div key={this.state.album._id} className="album-page-global-album-container">
          {this.testForEmptyState()}
          <AlbumPageContainer album={this.state.album} artist={this.state.artist} />
          <ChoiceContainer
            richChoices={this.state.richChoices}
            originAlbum={this.state.album}
            originArtist={this.state.artist}
          />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
  render() {
    return (
      <div className="Album-Page">
        <Link to="/"><AlbumPageHeader /></Link>
        <div className="album-page-ecouter-container">
          <h1>Essayez d'écouter </h1>
        </div>
          {this.renderSlidingSection()}
      </div>
    );
  }
}

AlbumPage.propTypes = {
  //: PropTypes.
};
