import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ChoiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {}
    };
    this.chooseTarget = this.chooseTarget.bind(this);
  }
  chooseTarget() {
    if (this.props.targetOrigin) {

    }
  }
  render() {
    if (this.props.richChoices.length > 0) {
      return (
        <div className="album-page-choice-container">
          {this.props.richChoices.map(richChoice => (
            <Link
              key={richChoice.targetObj._id}
              to={{
                pathname: this.props.targetOrigin ? `/${this.props.originAlbum._id}` : `/${richChoice.targetObj._id}`,
                state: {
                  originAlbum: this.props.originAlbum,
                  originArtist: this.props.originArtist,
                  richChoice: [richChoice],
                },
              }}
            >
              <div className="button button-album-page">
                <p>{richChoice.message}</p>
              </div>
            </Link>))}
        </div>
      );
    }
    return null;
  }
}
