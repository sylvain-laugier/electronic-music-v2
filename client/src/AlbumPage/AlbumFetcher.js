import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiKey from '../apiAuthentificate';

import PropTypesValue from '../lib/PropTypesValues';

import AlbumPage from './AlbumPage';

const { albumShape, artistShape, richChoiceShape } = PropTypesValue;

export default class AlbumFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      artist: {},
      previousAlbum: {},
      previousArtist: {},
      richChoices: [],
      previousChoice: [],
    };
    this.updateComponent = this.updateComponent.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.updateComponent(this.props), 100);
  }

  componentWillReceiveProps(nextProps) {
    // we check if a new id is given to the album fetcher, in that case we set the history in the state
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        previousAlbum: nextProps.location.state ? nextProps.location.state.originAlbum : {},
        previousArtist: nextProps.location.state ? nextProps.location.state.originArtist : {},
        previousChoice: nextProps.location.state ? nextProps.location.state.richChoice : [],
      }, () => this.updateComponent(nextProps));
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
  render() {
    const {
      album,
      artist,
      previousAlbum,
      previousArtist,
      richChoices,
      previousChoice,
    } = this.state;
    return (
      <AlbumPage
        album={album}
        artist={artist}
        previousAlbum={previousAlbum}
        previousArtist={previousArtist}
        richChoices={richChoices}
        previousChoice={previousChoice}
      />
    );
  }
}

AlbumFetcher.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequrired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.shape({
      originAlbum: PropTypes.shape(albumShape).isRequired,
      originArtist: PropTypes.shape(artistShape).isRequired,
      richChoice: PropTypes.arrayOf(PropTypes.shape(richChoiceShape)).isRequired,
    }),
  }).isRequired,
};
