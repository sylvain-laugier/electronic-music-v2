import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Album from './Album';

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
};

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.renderResults = this.renderResults.bind(this);
  }
  renderResults = () => {
    const { results } = this.props;
    if (this.props.type === 'album') {
      return results.map(album =>
        (<Album
          key={album.id}
          id={album.id}
          spotifyChecked={this.props.spotifyChecked}
          hasBeenSearched
        />));
    }
    return null;
  }
  render() {
    return (
      <div >
        <h1>{this.props.title}</h1>
        <div style={style}>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

ResultsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  spotifyChecked: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};
