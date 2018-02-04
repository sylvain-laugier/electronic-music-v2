import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
  width: 'calc(50% - 20px)',
  flex: '0 0 auto',
  margin: '10px',
};
export default class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }
  render() {
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
      </Card>
    );
  }
}

Artist.propTypes = {
  artist: PropTypes.isRequired,
};
