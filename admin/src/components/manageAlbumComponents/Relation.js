import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Album from '../albumComponents/Album';

export default class Relation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="relation-container">
        <Album
          id={this.props.relation[2].properties._id}
          overlayTitle={this.props.relation[1].properties.message}
          width="100%"
        />
      </div>
    );
  }
}

Relation.propTypes = {
  relation: PropTypes.array.isRequired,
};
