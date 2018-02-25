import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChoiceContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      album: {}
    }
  }
  render() {
    return (
      <h1>ChoiceContainer </h1>
    );
  }
}
