import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiKey from '../apiAuthentificate';

import { albumShape, richChoiceShape } from '../lib/PropTypesValues';

import AlbumPage from './AlbumPage';

export default class AlbumFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      previousAlbum: {},
      richChoices: [],
      previousChoice: {},
      loading: true,
      goBackButton: false,
    };
    this.updateComponent = this.updateComponent.bind(this);
  }

  componentDidMount() {
    this.updateComponent(this.props);
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  componentWillReceiveProps(nextProps) {
    // we check if a new id is given to the album fetcher, in that case we set the history in the state
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        previousAlbum: nextProps.location.state ? nextProps.location.state.originAlbum : {},
        previousChoice: nextProps.location.state ? nextProps.location.state.richChoice : {},
      }, () => this.updateComponent(nextProps));
    }
  }
  updateComponent(props) {
    // get album first then the artist and merge the two
    fetch(`/albums/${props.match.params.id}`, {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then((album) => {
        fetch(`/albums/artist/${props.match.params.id}`, {
          method: 'GET',
          headers: new Headers(apiKey),
        })
          .then(res => res.json())
          .then((artist) => {
            const albumObject = Object.assign({ artistName: artist.name }, album);
            this.setState({ album: albumObject });
          });
      });
    // Get all the related albums and set them in a rich choice array
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
            this.setState({
              goBackButton: this.context.router.history.length > 2,
            });
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
      previousAlbum,
      richChoices,
      previousChoice,
      loading,
      goBackButton,
    } = this.state;
    return loading ? null : (
      <AlbumPage
        album={album}
        previousAlbum={previousAlbum}
        richChoices={richChoices}
        previousChoice={previousChoice}
        goBackButton={goBackButton}
      />
    );
  }
}

AlbumFetcher.contextTypes = { router: PropTypes.object };

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
      richChoice: PropTypes.PropTypes.shape(richChoiceShape).isRequired,
    }),
  }).isRequired,
};
