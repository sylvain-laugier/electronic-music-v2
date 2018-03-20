import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleOpening = this.toggleOpening.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  toggleOpening() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }
  renderContent() {
    if (this.state.open) {
      return (
        <div>
          <p> This is open !!! </p>
        </div>);
    }
    return (
      <div>
        <p>About this website... </p>
      </div>
    );
  }
  render() {
    return(
      <div
        className={this.state.open ? 'footer footer-open' : 'footer'}
        onClick={this.toggleOpening}
      >
        {this.renderContent()}
      </div>
    );
  }
}

HomeFooter.propTypes = {

};

export default HomeFooter;
