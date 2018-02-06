import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Album from './Album';

export default class ManageAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: false,
    };
  }
  componentDidMount() {
    return fetch(`/albums/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(dbAlbumInfo => this.setState({
        found: !_.isEmpty(dbAlbumInfo),
      }));
  }
  render() {
    if (this.state.found) {
      return (
        <Album id={this.props.match.params.id} isUnderManagement />
      );
    }
    return <h1> Pas d\'album trouvé :(</h1>;
  }
}
/*
Album.propTypes = {
  album: PropTypes.isRequired,
};*/
