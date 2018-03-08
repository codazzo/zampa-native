import React from 'react';
import { FlatList } from 'react-native';
import { store as storePropType } from './propTypes';

import TagRow from './TagRow';

const TagListView = ({ store }) => (
  <FlatList
    data={store.tagsInRange.get()}
    renderItem={tag => <TagRow tag={tag.item} />}
  />
);

TagListView.propTypes = {
  store: storePropType.isRequired,
};

export default TagListView;
