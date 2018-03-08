import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';

export const tag = PropTypes.shape({
  track: PropTypes.shape({
    images: PropTypes.shape({
      default: PropTypes.string,
    }),
    heading: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
    }),
  }),
  geolocation: PropTypes.shape({
    altitude: PropTypes.number,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
});

export const tags = PropTypes.arrayOf(tag);

export const store = MobxPropTypes.observableObject;
