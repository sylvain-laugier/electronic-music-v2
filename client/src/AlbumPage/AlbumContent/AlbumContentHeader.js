import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const fontSizeGenerator = (size) => {
  if (size <= 10) {
    return {
      fontSize: '4rem',
      top: '4rem',
    };
  }
  const difference = ((size - 10) * 2) / 10;
  const fontSize = 4 - difference;
  if (fontSize < 2) {
    return {
      fontSize: '2rem',
      top: '8rem',
    };
  }
  return {
    fontSize: `${4 - difference}rem`,
    top: `${4 + difference}rem`,
  };
};

export default class AlbumContentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleArtist: {
        fontSize: '4rem',
        top: '4rem',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.artist.name !== 'undefined') {
      this.setState({
        styleArtist: fontSizeGenerator(nextProps.artist.name.length),
      });
    }
  }
  render() {
    return (
      <div className="album-content-header-background" >
        <h2>{`${this.props.album.name} `}<br /> <span>par</span></h2>
        <h3 style={this.state.styleArtist}>{`${this.props.artist.name}`}</h3>
      </div>
    )
  }
}
