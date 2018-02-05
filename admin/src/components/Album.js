import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  width: 'calc(50% - 20px)',
  flex: '0 0 auto',
  margin: '10px',
};
export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existInDatabase: false,
      databaseInfos: {},
    };
    this.renderActions = this.renderActions.bind(this);
    this.addAlbumToNeo4J = this.addAlbumToNeo4J.bind(this);
  }
  componentDidMount() {
    return fetch(`albums/${this.props.album.id}`)
      .then(res => res.json())
      .then(dbAlbumInfo => this.setState({
        existInDatabase: !_.isEmpty(dbAlbumInfo),
        databaseInfos: dbAlbumInfo,
      }));
  }
  addAlbumToNeo4J() {
    // First we search for album in spotify to get the complete object
    return fetch(`albums/get-spotify/${this.props.album.id}`)
      .then(res => res.json())
      .then((albumSpotifyObject) => {
        // once the search is done we send the result to add Db
        fetch('albums/add-album', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(albumSpotifyObject),
        }).then(res => res.json())
          .then((insertedAlbum) => {
            console.log('added :', insertedAlbum);
            this.setState({
              existInDatabase: !_.isEmpty(insertedAlbum),
              databaseInfos: insertedAlbum,
            });
          });
      });
  }
  renderActions() {
    if (this.state.existInDatabase) {
      return <FlatButton label="Manage" />;
    }
    return <FlatButton label="Add to DB" onClick={this.addAlbumToNeo4J} />;
  }
  render() {
    return (
      <Card style={style}>
        <CardMedia>
          <img src={this.props.album.images[0].url} alt="" />
        </CardMedia>
        <CardTitle title={this.props.album.name} subtitle={this.props.album.artists[0].name} />
        <CardActions>
          {this.renderActions()}
        </CardActions>
      </Card>
    );
  }
}

Album.propTypes = {
  album: PropTypes.isRequired,
};
