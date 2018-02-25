import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import apiKey from '../apiAuthentificate.js';

import AlbumPageHeader from './AlbumPageHeader';
import AlbumPageContainer from './AlbumPageContainer';
import ChoiceContainer from './ChoiceContainer'

export default class AlbumPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      album: {}
    }
  }
  componentDidMount() {
    fetch(`/albums/${this.props.match.params.id}`, {
      method: 'GET',
      headers: new Headers(apiKey),
    })
      .then(res => res.json())
      .then(album => this.setState({ album }));
  }
  render() {
    return (
      <div>
        <Link to="/"><AlbumPageHeader /></Link>
        <AlbumPageContainer album={this.state.album}/>
        <ChoiceContainer />
      </div>
    );
  }
}

AlbumPage.propTypes = {
  //: PropTypes.
};
