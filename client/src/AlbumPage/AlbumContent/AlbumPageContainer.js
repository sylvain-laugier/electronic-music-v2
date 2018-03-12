import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlbumContentHeader from './AlbumContentHeader';
import AlbumContentContainer from './AlbumContentContainer';
import ChoiceContainer from '../Choices/ChoiceContainer';

export default class AlbumPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.selectMode = this.selectMode.bind(this);
  }
  selectMode() {
    if (this.props.minimized) {
      return (
        <div className=" Album-Page-Container Album-Page-Container-minimized">
          <AlbumContentHeader minimized album={this.props.album} artist={this.props.artist} />
          <ChoiceContainer
            richChoices={this.props.richChoice}
            originAlbum={this.props.album}
            originArtist={this.props.artist}
            targetOrigin
          />
        </div>
      );
    }
    return (
      <div className="Album-Page-Container">
        <AlbumContentHeader album={this.props.album} artist={this.props.artist} />
        <AlbumContentContainer album={this.props.album} />
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.selectMode()}
      </div>
    );
  }
}
