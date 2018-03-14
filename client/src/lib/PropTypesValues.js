import PropTypes from 'prop-types';

export const albumShape = {
  _id: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  name: PropTypes.string,
  popularity: PropTypes.number,
  release_date: PropTypes.number,
  url: PropTypes.string,
  artistName: PropTypes.string,
};
export const richChoiceShape = {
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
};
