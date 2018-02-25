import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ChoiceContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      album: {}
    }
  }
  render() {
    if (this.props.richChoices.length > 0) {
      return (
        <div className="album-page-choice-container">
        {this.props.richChoices.map(richChoice => <Link  to={`/${richChoice.targetObj._id}`}>
          <div className="button button-album-page">
            <h3>{richChoice.message}</h3>
          </div>
        </Link> )}
      </div>
      );
    }
    return null;
  }
}
