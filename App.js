/* eslint-disable react/no-unused-state */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import TracksMapView from './components/TracksMapView';
import {
  blue,
  white,
} from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  tabbar: {
    backgroundColor: white,
  },
  indicator: {
    backgroundColor: blue,
  },
});

const renderScene = ({ route }) => { // eslint-disable-line react/prop-types
  switch (route.key) {
    case '1':
      return (
        <TracksMapView />
      );
    case '2':
      return (
        <View>
          <Text>
            View 2
          </Text>
        </View>
      );
    default:
      return null;
  }
};

const renderIcon = ({ route }) => ( // eslint-disable-line react/prop-types
  <Ionicons
    name={route.icon}
    size={24}
    color={blue}
  />
);

const renderHeader = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    renderIcon={renderIcon}
    style={styles.tabbar}
  />
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: '1', icon: 'md-map' },
        { key: '2', icon: 'md-list' },
      ],
    };
  }

  handleIndexChange(index) {
    this.setState({
      index,
    });
  }

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={renderScene}
        renderHeader={renderHeader}
        onIndexChange={index => this.handleIndexChange(index)}
      />
    );
  }
}
