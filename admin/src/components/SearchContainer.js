import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/search';

const paperStyle = {
  margin: '0px auto',
  width: '80%',
  display: 'flex',
  justifyContent: 'center',
};

const textStyle = {
  margin: '0px 20px',
};

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange = (event) => {
    this.setState({
      searchField: event.target.value,
    });
  };
  render() {
    return (
      <div>
        <Paper style={paperStyle} zDepth={0} >
          <TextField
            style={textStyle}
            hintText="Rechercher"
            value={this.state.searchField}
            onChange={this.handleTextChange}
          />
          <FlatButton
            backgroundColor="#e53935"
            hoverColor="#ff6f60"
            icon={<ActionAndroid color="#fff" />}
            onClick={() => this.props.handleSearch(this.state.searchField)}
          />
        </Paper>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
