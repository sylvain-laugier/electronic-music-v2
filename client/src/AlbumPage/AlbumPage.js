import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import apiKey from '../apiAuthentificate.js';

import AlbumPageHeader from './AlbumPageHeader';
import AlbumPageContainer from './AlbumPageContainer';
import ChoiceContainer from './ChoiceContainer'

export default class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      artist: {},
      richChoices: [],
      newLoading: true,
    };
    this.updateComponent = this.updateComponent.bind(this);
    this.renderSlidingSection = this.renderSlidingSection.bind(this);
  }

  componentDidMount() {
    this.updateComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        newLoading: true,
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
            }
          });
      });
  }
  renderSlidingSection() {
      return (
        <div key={this.props.match.params.id} className="sliding-section-container">
          <AlbumPageContainer album={this.state.album} artist={this.state.artist} />
          <ChoiceContainer richChoices={this.state.richChoices} />
        </div>
      );

  }
  render() {
    return (
      <div>
        <Link to="/"><AlbumPageHeader /></Link>
        <div className="album-page-ecouter-container">
          <h1>Essayez d'écouter </h1>
        </div>
        <div className="temporary-slide-container" >
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={100500}
          transitionLeaveTimeout={100500}

        >

          {this.renderSlidingSection()}
        </ReactCSSTransitionGroup>
      </div>
      </div>
    );
  }
}

AlbumPage.propTypes = {
  //: PropTypes.
};