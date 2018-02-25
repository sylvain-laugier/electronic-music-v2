import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    };
    this.updateComponent = this.updateComponent.bind(this);
  }

  componentDidMount() {
    this.updateComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.updateComponent(nextProps);
    }
  }
  updateComponent(props) {
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
                  console.log(choice);
                  const relativeDestination = destinations
                    .map(destination => destination._fields[0])
                    .find(destination => choice.end.low === destination.identity.low);
                  console.log(relativeDestination);
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
  render() {
    return (
      <div>
        <Link to="/"><AlbumPageHeader /></Link>
        <AlbumPageContainer album={this.state.album} artist={this.state.artist} />
        <ChoiceContainer richChoices={this.state.richChoices} />
      </div>
    );
  }
}

AlbumPage.propTypes = {
  //: PropTypes.
};
