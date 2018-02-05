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
export default class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existInDatabase: false,
      databaseInfos: {},
    };
    this.renderActions = this.renderActions.bind(this);
    this.addArtistToNeo4J = this.addArtistToNeo4J.bind(this);
  }
  componentDidMount() {
    return fetch(`artists/${this.props.artist.id}`)
      .then(res => res.json())
      .then(dbArtistInfo => this.setState({
        existInDatabase: !_.isEmpty(dbArtistInfo),
        databaseInfos: dbArtistInfo,
      }));
  }
  addArtistToNeo4J() {
    // First we search for artist in spotify to get the complete object
    return fetch(`artists/get-spotify/${this.props.artist.id}`)
      .then(res => res.json())
      .then((ArtistSpotifyObject) => {
        // once the search is done we send the result to add Db
        fetch('artists/add-artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ArtistSpotifyObject),
        }).then(res => res.json())
          .then((insertedArtist) => {
            console.log('added :', insertedArtist);
            this.setState({
              existInDatabase: !_.isEmpty(insertedArtist),
              databaseInfos: insertedArtist,
            });
          });
      });
  }
  renderActions() {
    if (this.state.existInDatabase) {
      return <FlatButton label="Manage" />;
    }
    return <FlatButton label="Add to DB" onClick={this.addArtistToNeo4J} />;
  }
  render() {
    if (!this.props.spotifyChecked || this.state.existInDatabase) {
      return (
        <Card style={style}>
          <CardMedia>
            <img
              src={typeof this.props.artist.images[0] !== 'undefined' ?
              this.props.artist.images[0].url
              : 'https://images.vexels.com/media/users/3/137413/isolated/preview/4acb8e52632aa9b7c874b878eaf02bc4-spotify-icon-logo-by-vexels.png'}
              alt=""
            />
          </CardMedia>
          <CardTitle title={this.props.artist.name} subtitle={this.props.artist.genres[0]} />
          <CardActions>
            {this.renderActions()}
          </CardActions>
        </Card>
      );
    }
    return null;
  }
}

Artist.propTypes = {
  artist: PropTypes.isRequired,
};
