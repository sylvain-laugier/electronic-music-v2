import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      existInDatabase: false,
      loading: true,
      style: {
        width: `calc(${this.props.width} - 20px)`,
        flex: '0 0 auto',
        margin: '10px',
      },
    };
    this.renderActions = this.renderActions.bind(this);
    this.addAlbumToNeo4J = this.addAlbumToNeo4J.bind(this);
  }
  componentDidMount() {
    // every album has to search for itself in spotify to be displayed
    fetch(`/albums/get-spotify/${this.props.id}`)
      .then(res => res.json())
      .then(album => this.setState({
        album,
        loading: false,
      }));
    // if the album is displayed in the context of search, it searchs for itself in the databse
    if (this.props.hasBeenSearched) {
      return fetch(`/albums/${this.props.id}`)
        .then(res => res.json())
        .then(dbAlbumInfo => this.setState({
          existInDatabase: !_.isEmpty(dbAlbumInfo),
        }));
    }
    return null;
  }
  addAlbumToNeo4J() {
    fetch('albums/add-album', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.album),
    }).then(res => res.json())
      .then((insertedAlbum) => {
        console.log('added :', insertedAlbum);
        this.setState({
          existInDatabase: !_.isEmpty(insertedAlbum),
        });
      });
  }
  renderActions() {
    // in this first case, the album is searched in the context of management
    if (this.props.hasBeenSearched && this.props.isUnderManagement) {
      return <FlatButton label="add as a relationship" />;
    } else if (this.props.hasBeenSearched) {
      // in this case, the album is searched in the context of search
      // we display the appropriate value depending on the presence of the album in the database
      if (this.state.existInDatabase) {
        return (
          <Link to={`album/${this.state.album.id}`}>
            <FlatButton label="Manage" />
          </Link>

        );
      }
      return <FlatButton label="Add to DB" onClick={this.addAlbumToNeo4J} />;
    }
    // base case, we just wand to display the album information for the sake of it
    return null;
  }
  render() {
    if (!this.state.loading) {
      // if the spotify checkbox is checked,
      // we only display the component if it has been found in the database
      if (!this.props.spotifyChecked || this.state.existInDatabase) {
        return (
          <Card style={this.state.style}>
            <CardMedia>
              <img src={this.state.album.images[0].url} alt="" />
            </CardMedia>
            <CardTitle title={this.state.album.name} subtitle={this.state.album.artists[0].name} />
            <CardActions>
              {this.renderActions()}
            </CardActions>
          </Card>
        );
      }
    }
    return (
      <Card style={this.state.style}>
        <CircularProgress />
      </Card>
    );
  }
}

Album.defaultProps = {
  hasBeenSearched: false,
  isUnderManagement: false,
  spotifyChecked: false,
  width: '25%',
};

Album.propTypes = {
  id: PropTypes.string.isRequired,
  hasBeenSearched: PropTypes.bool,
  isUnderManagement: PropTypes.bool,
  spotifyChecked: PropTypes.bool,
  width: PropTypes.string,
};
