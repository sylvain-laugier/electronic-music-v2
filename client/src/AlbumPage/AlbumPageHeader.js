import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AlbumPageHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      album: {}
    }
  }
  render() {
    return (
      <div className="album-page-header">
        <h1>Electronic music for people who don&apos;'t like electronic music </h1>
      </div>
    );
  }
}
