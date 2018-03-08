import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { tag as tagPropType } from './propTypes';

const PLACEHOLDER_IMG_URL = 'https://images.shazam.com/coverart/t52891302-a0886446056081_s400.jpg';

const styles = {
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontWeight: 'bold',
  },
  artist: {
    color: 'gray',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
};

const TagRow = ({ tag }) => {
  const { track } = tag;
  const imgUrl = track.images ? track.images.default : PLACEHOLDER_IMG_URL;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imgUrl }}
      />
      <View>
        <Text style={styles.title}>
          {track.heading.title}
        </Text>
        <Text style={styles.artist}>
          {track.heading.subtitle}
        </Text>
      </View>
    </View>
  );
};

TagRow.propTypes = {
  tag: tagPropType.isRequired,
};

export default TagRow;
