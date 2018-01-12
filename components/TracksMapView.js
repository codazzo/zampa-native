import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import styles from './TracksMapView.styles';

const centerLatitude = 41.8962667;
const centerLongitude = 11.3340056;
const DRAGGABLE_MAP_AREA_WIDTH = 40;
const TAGS_CACHE_KEY = 'TAGS_CACHE';

const renderMarker = pin => (
  <Marker
    key={pin.id || Math.random()}
    coordinate={pin.location}
  />
);

const getData = async () => JSON.parse(await AsyncStorage.getItem(TAGS_CACHE_KEY));

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

export default class TracksMapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [],
    };

    this.loadPins = this.loadPins.bind(this);
  }

  async componentDidMount() {
    const data = await getData();
    this.loadPins(data.tags);
  }

  loadPins(tags) {
    const pins = tags
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
          renderMarker={renderMarker}
          renderCluster={renderCluster}
          preserveClusterPressBehavior
          animateClusters={false}
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

        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: Dimensions.get('window').width - DRAGGABLE_MAP_AREA_WIDTH,
            backgroundColor: 'transparent',
          }}
        />
      </View>
    );
  }
}
