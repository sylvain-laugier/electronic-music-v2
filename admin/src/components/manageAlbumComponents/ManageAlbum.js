import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

import Album from '../albumComponents/Album';
import SearchWrapper from '../SearchWrapper';
import Relation from './Relation';

export default class ManageAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: false,
      loading: true,
      relations: [],
    };
    this.addRelationship = this.addRelationship.bind(this);
    this.renderRelations = this.renderRelations.bind(this);
    this.getRelationShips = this.getRelationShips.bind(this);
  }
  componentDidMount() {
    fetch(`/albums/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(dbAlbumInfo => this.setState({
        found: !_.isEmpty(dbAlbumInfo),
        loading: false,
      }));
    this.getRelationShips();
  }
  getRelationShips() {
    fetch(`/albums/relationships/${this.props.match.params.id}`)
      .then(res => res.json())
      .then((relationships) => {
        const onlyFields = relationships.map(relation => relation._fields);
        this.setState({
          relations: onlyFields,
        });
      });
  }
  addRelationship(targetId, message) {
    const property = {
      source: {
        label: 'Album',
        _id: this.props.match.params.id,
      },
      target: {
        label: 'Album',
        _id: targetId,
      },
      rel: {
        type: 'ALBUM_RECO',
        message,
      },
    };
    fetch('/albums/add-album-relationship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    }).then(res => res.json())
      .then((newRelation) => {
        this.getRelationShips();
        console.log('relation created:', newRelation);
      });
  }
  renderRelations() {
    if (this.state.relations.length > 0) {
      return this.state.relations.map(relation => <Relation key={`${relation[1].start.low}${relation[1].end.low}`} relation={relation} />);
    }
    return null;
  }
  render() {
    if (this.state.found) {
      return (
        <div>
          <Link to="/">
            <IconButton tooltip="Back home">
              <ActionHome />
            </IconButton>
          </Link>
          <div className="manage-album-container">
            <Album
              id={this.props.match.params.id}
              isUnderManagement
            />
            <div className="relations-container">
              {this.renderRelations()}
            </div>
          </div>
          <SearchWrapper isUnderManagement addRelationship={this.addRelationship} />
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
