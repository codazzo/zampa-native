import React from 'react';
import {
  arrayOf,
  number,
} from 'prop-types';

import {
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';

export default function ScatterPlot({
  timestamps,
}) {
  const oldestTimestamp = Math.min(...timestamps);
  const data = timestamps.map(timestamp => ({
    x: new Date(timestamp),
    y: 0,
  }));

  return (
    <VictoryScatter
      theme={VictoryTheme.material}
      style={{
        data: {
          fillOpacity: 0.05,
        },
      }}
      height={100}
      scale={{ x: 'time' }}
      data={data}
      domain={{
        x: [new Date(oldestTimestamp), new Date()],
        y: [0, 1],
      }}
      padding={{
        top: 20,
        bottom: 50,
        left: 10,
        right: 10,
      }}
    />
  );
}

ScatterPlot.propTypes = {
  timestamps: arrayOf(number),
};

ScatterPlot.defaultProps = {
  timestamps: [],
};
