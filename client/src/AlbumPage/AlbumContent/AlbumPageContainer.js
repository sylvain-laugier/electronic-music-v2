import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlbumContentHeader from './AlbumContentHeader';
import AlbumContentContainer from './AlbumContentContainer';

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
      return <AlbumContentHeader minimized album={this.props.album} artist={this.props.artist} />
    }
    return (
      <div>
        <AlbumContentHeader album={this.props.album} artist={this.props.artist} />
        <AlbumContentContainer album={this.props.album} />
      </div>
    );
  }
  render() {
    return (
      <div className="Album-Page-Container">
        {this.selectMode()}
      </div>
    );
  }
}
