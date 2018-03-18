import React from 'react';
import PropTypes from 'prop-types';

import { albumShape, richChoiceShape } from '../../lib/PropTypesValues';

import Choice from './Choice';

const ChoiceContainer = ({ originAlbum, richChoices, setReverseAnim }) => {
  if (richChoices.length > 0) {
    return (
      <div className="album-page-choice-container">
        {richChoices.map(richChoice => (
          <Choice
            originAlbum={originAlbum}
            richChoice={richChoice}
            setReverseAnim={setReverseAnim}
            key={richChoice.targetObj._id}
          />
          ))}
      </div>
    );
  }
  return null;
};

ChoiceContainer.propTypes = {
  originAlbum: PropTypes.shape(albumShape).isRequired,
  richChoices: PropTypes.arrayOf(PropTypes.shape(richChoiceShape)).isRequired,
};

export default ChoiceContainer;
