import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { observer } from 'mobx-react';

import { store as storePropType } from './propTypes';
import styles from './TracksMapView.styles';

const centerLatitude = 41.8962667;
const centerLongitude = 11.3340056;
const DRAGGABLE_MAP_AREA_WIDTH = 40;

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


class TracksMapView extends Component {
  onRegionChangeComplete(region) {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = region;

    const minLat = latitude - (latitudeDelta / 2);
    const maxLat = latitude + (latitudeDelta / 2);
    const minLng = longitude - (longitudeDelta / 2);
    const maxLng = longitude + (longitudeDelta / 2);

    this.props.store.setBounds({
      minLat,
      maxLat,
      minLng,
      maxLng,
    });
  }

  render() {
    const tags = this.props.store.tagsInRange.get();
    const pins = tags
      .filter(tag => tag.geolocation)
      .map((tag, i) => ({
        id: `pin${i}`,
        location: tag.geolocation,
      }));

    return (
      <View style={styles.container}>
        <ClusteredMapView
          style={{ flex: 1 }}
          data={pins}
          ref={(r) => { this.map = r; }}
          renderMarker={renderMarker}
          renderCluster={renderCluster}
          preserveClusterPressBehavior
          onRegionChangeComplete={region => this.onRegionChangeComplete(region)}
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

TracksMapView.propTypes = {
  store: storePropType.isRequired,
};

export default observer(TracksMapView);
