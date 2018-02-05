import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class ManageAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
    };
  }
  componentDidMount() {
    return fetch(`/albums/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(dbAlbumInfo => this.setState({
        album: dbAlbumInfo,
      }));
  }
  render() {
    if (!_.isEmpty(this.state.album)) {
      return (
        <Card >
          <CardMedia>
            <img src={this.state.album.image} alt="" />
          </CardMedia>
          <CardTitle title={this.state.album.name} subtitle={this.state.album.name} />
        </Card>
      );
    }
    return <h1> Pas d'album trouvé :(</h1> ;
  }
}
/*
Album.propTypes = {
  album: PropTypes.isRequired,
};*/
