import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      existInDatabase: false,
      loading: true,
      messRelationDialogOpen: false,
      messaRelation: '',
      style: {
        width: `calc(${this.props.width} - 20px)`,
        flex: '0 0 auto',
        margin: '10px',
      },
    };
    this.renderActions = this.renderActions.bind(this);
    this.addAlbumToNeo4J = this.addAlbumToNeo4J.bind(this);
    this.addArtistToNeo4J = this.addArtistToNeo4J.bind(this);
    this.addArtistAlbumRelationship = this.addArtistAlbumRelationship.bind(this);
    this.handleMessDialogOpen = this.handleMessDialogOpen.bind(this);
    this.handleMessDialogClose = this.handleMessDialogClose.bind(this);
    this.renderAddRelationshipButton = this.renderAddRelationshipButton.bind(this);
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
  handleMessDialogOpen = () => {
    this.setState({ messRelationDialogOpen: true });
  };

  handleMessDialogClose = () => {
    this.setState({ messRelationDialogOpen: false });
  };
  addAlbumToNeo4J() {
    fetch('/albums/add-album', {
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
        // we check if the artist exist in the database
        fetch(`/artists/${this.state.album.artists[0].id}`)
          .then(res => res.json())
          .then((artistRes) => {
            if (_.isEmpty(artistRes)) {
              // if not, we add him to the db
              this.addArtistToNeo4J(() => this.addArtistAlbumRelationship());
            } else {
              // if it exist we create the relationship
              this.addArtistAlbumRelationship();
            }
          });
      });
  }

  addArtistToNeo4J(callback) {
    fetch(`/artists/get-spotify/${this.state.album.artists[0].id}`)
      .then(res => res.json())
      .then((spotifyArtist) => {
        fetch('/artists/add-artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(spotifyArtist),
        }).then(res => res.json())
          .then((insertedArtist) => {
            console.log('added :', insertedArtist);
            if (_.isFunction(callback)) {
              callback();
            }
          });
      });
  }

  addArtistAlbumRelationship() {
    const property = {
      source: {
        label: 'Artist',
        _id: this.state.album.artists[0].id,
      },
      target: {
        label: 'Album',
        _id: this.state.album.id,
      },
      rel: {
        reltype: 'AUTHORED',
      },
    };
    fetch('/add-relationship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    }).then(res => res.json())
      .then(addedRelation => console.log(addedRelation));
  }
  handleTextChange = (event) => {
    this.setState({
      messaRelation: event.target.value,
    });
  };
  renderAddRelationshipButton() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleMessDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={() => {
          this.props.addRelationship(this.props.id, this.state.messaRelation);
          return this.handleMessDialogClose();
        }}
      />,
    ];
    return (
      <div>
        <FlatButton
          label="add as a relationship"
          onClick={this.handleMessDialogOpen}
        />
        <Dialog
          title="Entrez le message de la relation"
          actions={actions}
          modal={false}
          open={this.state.messRelationDialogOpen}
          onRequestClose={this.handleMessDialogClose}
        >
          <TextField
            style={{
              margin: '0px 20px',
            }}
            hintText="Message"
            value={this.state.messaRelation}
            onChange={this.handleTextChange}
          />
        </Dialog>
      </div>
    );
  }
  renderActions() {
    // in this first case, the album is searched in the context of management
    if (this.props.hasBeenSearched && this.props.isUnderManagement) {
      if (this.state.existInDatabase) {
        return this.renderAddRelationshipButton();
      }
      return <FlatButton label="Add to DB" onClick={this.addAlbumToNeo4J} />;
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
      return null;
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
  addRelationship: () => null,
};

Album.propTypes = {
  id: PropTypes.string.isRequired,
  hasBeenSearched: PropTypes.bool,
  isUnderManagement: PropTypes.bool,
  spotifyChecked: PropTypes.bool,
  width: PropTypes.string,
  addRelationship: PropTypes.func,
};
