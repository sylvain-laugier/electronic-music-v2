import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Album from './Album';
import SearchWrapper from './SearchWrapper';

export default class ManageAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: false,
      loading: true,
    };
  }
  componentDidMount() {
    return fetch(`/albums/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(dbAlbumInfo => this.setState({
        found: !_.isEmpty(dbAlbumInfo),
        loading: false,
      }));
  }
  render() {
    if (this.state.found) {
      return (
        <div>
          <Album id={this.props.match.params.id} isUnderManagement />
          <SearchWrapper />
        </div>
      );
    }
    if (!this.state.loading) {
      return <h1> Pas d\'album trouvé :(</h1>;
    }
    return null;
  }
}
/*
Album.propTypes = {
  album: PropTypes.isRequired,
};*/
