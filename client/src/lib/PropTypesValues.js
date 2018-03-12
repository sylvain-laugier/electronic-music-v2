import PropTypes from 'prop-types';

const commonPropTypes = {
  albumShape: {
    _id: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
    popularity: PropTypes.number,
    release_date: PropTypes.number,
    url: PropTypes.string,
  },
  artistShape: {
    _id: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
    popularity: PropTypes.number,
    url: PropTypes.string,
  },
  richChoiceShape: {
    message: PropTypes.string.isRequired,
    targetObj: PropTypes.shape({
      _id: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string,
      name: PropTypes.string,
      popularity: PropTypes.number,
      release_date: PropTypes.number,
      url: PropTypes.string,
    }),
  },
};

export default commonPropTypes;
