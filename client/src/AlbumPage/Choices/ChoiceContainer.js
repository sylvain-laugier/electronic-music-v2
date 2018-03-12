import React from 'react';
import PropTypes from 'prop-types';

import PropTypesValue from '../../lib/PropTypesValues';

import Choice from './Choice';

const { albumShape, artistShape, richChoiceShape } = PropTypesValue;

const ChoiceContainer = ({ originAlbum, originArtist, richChoices }) => {
  if (richChoices.length > 0) {
    return (
      <div className="album-page-choice-container">
        {richChoices.map(richChoice => (
          <Choice
            originAlbum={originAlbum}
            originArtist={originArtist}
            richChoice={richChoice}
          />
          ))}
      </div>
    );
  }
  return null;
};

ChoiceContainer.propTypes = {
  originAlbum: PropTypes.shape(albumShape).isRequired,
  originArtist: PropTypes.shape(artistShape).isRequired,
  richChoices: PropTypes.arrayOf(PropTypes.shape(richChoiceShape)).isRequired,
};

export default ChoiceContainer;
