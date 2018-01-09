'use-strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';

import ScatterPlot from './components/ScatterPlot';
import styles from './App.styles';
import data from './data.json';

const centerLatitude = 41.8962667;
const centerLongitude = 11.3340056;

const renderMarker = pin => (
  <Marker
    key={pin.id || Math.random()}
    coordinate={pin.location}
  />
);

const renderCluster = (cluster, onPress) => {
  const {
    pointCount,
    coordinate,
  } = cluster;

  return (
    <Marker onPress={onPress} coordinate={coordinate} key={cluster.clusterId}>
      <View style={styles.clusterContainer}>
        <Text style={styles.counterText}>{pointCount}</Text>
      </View>
    </Marker>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [],
    };

    this.loadPins = this.loadPins.bind(this);
  }

  componentDidMount() {
    this.loadPins();
  }

  loadPins() {
    const pins = data.tags
      .filter(tag => tag.geolocation)
      .map((tag, i) => ({
        id: `pin${i}`,
        location: tag.geolocation,
      }));

    this.setState({
      pins,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ClusteredMapView
          style={{ flex: 1 }}
          data={this.state.pins}
          ref={(r) => { this.map = r; }}
          textStyle={{ color: '#65bc46' }}
          renderMarker={renderMarker}
          renderCluster={renderCluster}
          preserveClusterPressBehavior
          initialRegion={{
            latitude: centerLatitude,
            longitude: centerLongitude,
            latitudeDelta: 12,
            longitudeDelta: 12,
          }}
          edgePadding={{
            top: 32,
            left: 10,
            right: 64,
            bottom: 64,
          }}
        />

        <ScatterPlot timestamps={data.tags.map(tag => tag.timestamp)} />

        <View style={styles.controlBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.loadPins}
          >
            <Text style={styles.text}>loadPins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.text}>Something else</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
