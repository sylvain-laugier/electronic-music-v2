import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
  width: 'calc(50% - 20px)',
  flex: '0 0 auto',
  margin: '10px',
};
export default class Album extends Component {
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
          <img src={this.props.album.images[0].url} alt="" />
        </CardMedia>
        <CardTitle title={this.props.album.name} subtitle={this.props.album.artists[0].name} />
      </Card>
    );
  }
}

Album.propTypes = {
  album: PropTypes.isRequired,
};
